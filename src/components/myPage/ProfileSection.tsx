import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileComponent from "../../components/common/ProfileComponent";
import { teamLogos } from "../../types/teamLogos";
import { mypage } from "../../apis/mypage";
import { uploadToAws } from "../../apis/review";
import useStore from "../../store/PreferTeamStore";

interface ProfileSectionProps {
  onTeamClick: () => void;
  onProfileUpdate: (nickname: string, image: string | null) => Promise<void>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  onTeamClick,
  onProfileUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { preferTeam, setPreferTeam } = useStore();
  const toggleEditMode = async () => {
    if (isEditing) {
      if (nickName.trim() === "") {
        alert("닉네임이 비어있어요!");
        return;
      }
      await onProfileUpdate(nickName, profileImage);
    }
    setIsEditing((prev) => !prev);
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadToAws(file);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const myInfo = await mypage.MyPageInfo();
        console.log("myInfo:", myInfo);
        setNickName(myInfo.nickname);
        setProfileImage(myInfo.image);
        setPreferTeam(myInfo.fanTeamName);
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <ProfileContainer>
      <ProfileComponent
        profileImage={profileImage}
        isEditing={isEditing}
        TeamLogo={teamLogos[preferTeam]}
        onImageChange={handleImageChange}
        onTeamClick={onTeamClick}
      />
      {isEditing ? (
        <NickNameInput
          type="text"
          value={nickName}
          onChange={handleNickNameChange}
        />
      ) : (
        <NickName>{nickName}</NickName>
      )}
      <EditBtn onClick={toggleEditMode}>
        {isEditing ? "수정 완료" : "프로필 수정"}
      </EditBtn>
    </ProfileContainer>
  );
};

export default ProfileSection;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: #d9d9d9;
  border-radius: 20px;
  padding: 65px 20px 40px;
`;

const NickName = styled.p`
  padding: 0.5rem;
  margin-top: 30px;
  margin-bottom: 5px;
  color: #686868;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 600;
`;

const NickNameInput = styled.input`
  width: 80%;
  margin-top: 30px;
  margin-bottom: 5px;
  padding: 0.5rem;
  border-radius: 10px 10px 0 0;
  color: #686868;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #686868;
  background: #fff;
  outline: none;
`;

const EditBtn = styled.button`
  display: inline;
  border: none;
  background: none;
  color: #686868;
  font-family: Inter;
  font-size: 0.7rem;
  font-weight: 400;
  text-align: center;
  border-bottom: 1px solid #686868;
  cursor: pointer;

  &:hover {
    font-weight: 800;
    transition: 0.2s ease;
  }
`;
