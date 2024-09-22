import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "../../components/layout/MenuItem";
import ProfileComponent from "../../components/common/ProfileComponent";
import useModalStore from "../../store/modalStore";
import useStore from "../../store/PreferTeamStore";
import { useEffect, useState } from "react";
import { teamLogos } from "../../types/teamLogos";
import { mypage } from "../../apis/mypage";
import { uploadToAws } from "../../apis/review";

const MyPageLayout = () => {
  const { openModal, closeModal} = useModalStore();
  const { preferTeam, setPreferTeam, setTeamSelectorActive } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTeamClick = () => {
    if (window.location.pathname !== "/mypage") {
      openModal({
        title: "관심 팀 변경",
        content: "관심 팀을 변경하시겠어요?",
        onConfirm: () => {
          setTeamSelectorActive(true);
          navigate("/mypage");
          closeModal();
        },
        showCancel: true
      });
    } else {
      setTeamSelectorActive(true);
    }
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      if (nickName.trim() === "") {
        alert("닉네임이 비어있어요!");
        return;
      }

      try {
        await mypage.EditProfile(nickName, profileImage!);
        alert("프로필 수정이 완료되었습니다.");
      } catch (error) {
        console.error("프로필 수정 중 오류 발생:", error);
        alert("프로필 수정에 실패했습니다.");
      }
    }
    setIsEditing((prev) => !prev); // 수정 모드 토글
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // AWS S3에 이미지 업로드 후 URL 받아오기
        const imageUrl = await uploadToAws(file);
        setProfileImage(imageUrl); // 업로드된 이미지 URL을 상태에 저장
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myInfo = await mypage.MyPageInfo();
        setNickName(myInfo.nickname);
        setProfileImage(myInfo.image);
        setPreferTeam(myInfo.fanTeamName);
        console.log("myInfo:", myInfo);
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <PageContainer>
      <MenuContainer>
        <Title>
          <Link to="/mypage">마이페이지</Link>
        </Title>
        <ProfileContainer>
          <ProfileComponent
            profileImage={profileImage}
            isEditing={isEditing}
            TeamLogo={teamLogos[preferTeam]}
            onImageChange={handleImageChange}
            onTeamClick={handleTeamClick}
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
        <MenuItem to="/mypage/bookmark" label="MY 북마크" />
        <MenuItem to="/mypage/recommend" label="MY 추천행" />
        <MenuItem to="/mypage/review" label="MY 야구행 리뷰" />
        <MenuItem to="/mypage/account" label="나의 계정 관리" />
      </MenuContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </PageContainer>
  );
};
export default MyPageLayout;

const PageContainer = styled.div`
  display: flex;
  background-color: #000;
  min-height: 100vh;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20vh 5vw;
  @media (max-width: 1024px) {
    padding: 10vh 10vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const MenuContainer = styled.div`
  min-width: 250px;
  max-width: 350px;
  padding-right: 5vw;
  margin-bottom: 2rem;
  @media (max-width: 1024px) {
    padding-right: 0;
    width: 100%;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #686868;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 2rem;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  @media (max-width: 1024px) {
    width: 80%;
    margin-top: 0;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: #d9d9d9;
  border-radius: 20px;
  width: 100%;
  padding: 65px 0px 40px 0px;
`;

const NickName = styled.p`
  padding: 0.5rem;
  margin-top: 30px;
  margin-bottom: 5px;

  color: #686868;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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
  line-height: normal;
  letter-spacing: 0.0625rem;

  &:hover {
    font-weight: 800;
    transition: 0.2s ease;
  }
`;
