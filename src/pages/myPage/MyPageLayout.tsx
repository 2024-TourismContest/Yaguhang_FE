import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "../../components/layout/MenuItem";
import ProfileComponent from "../../components/common/ProfileComponent";
import Modal from "../../components/common/Modal";
import useStore from "../../store/PreferTeamStore";
import { useState } from "react";
import { teamLogos } from "../../types/teamLogos";

const profileUrl =
  "https://png.pngtree.com/thumb_back/fh260/background/20210409/pngtree-rules-of-biotex-cat-image_600076.jpg";

export default function MyPageLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { preferTeam, setTeamSelectorActive } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickName, setNickName] = useState("홍차추출액어쩌고");
  const [profileImage, setProfileImage] = useState(profileUrl);
  const navigate = useNavigate();

  const handleTeamClick = () => {
    if (window.location.pathname !== "/mypage") {
      setIsModalOpen(true);
    } else {
      setTeamSelectorActive(true);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/mypage");
    setTeamSelectorActive(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const toggleEditMode = () => {
    if (isEditing && nickName.trim() === "") {
      alert("닉네임이 비어있어요!");
      return;
    }
    setIsEditing((prev) => !prev);
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <MenuItem to="/mypage/stamp" label="MY 야구공 스탬프" />
        <MenuItem to="/mypage/bookmark" label="MY 북마크" />
        <MenuItem to="/mypage/recommend" label="MY 추천행" />
        <MenuItem to="/mypage/review" label="MY 야구행 리뷰" />
        <MenuItem to="/mypage/account" label="나의 계정 관리" />
      </MenuContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      {isModalOpen && (
        <Modal
          title="구장 선택 변경"
          content="구장 선택기를 변경하려면 페이지를 이동해야 합니다. 이동하시겠습니까?"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 2rem 1rem;
  min-height: 100vh;
  max-width: 1300px;
  margin: 0 auto; // 가운데 정렬
  align-items: flex-start;
  justify-content: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    padding-top: 20vh;
  }
`;

const MenuContainer = styled.div`
  width: fit-content;
  min-width: 250px;
  padding: 1rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    width: 250px;
    margin-right: 2rem;
    margin-bottom: 0;
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
  padding: 1rem;
  width: 100%; // 부모 컨테이너의 너비에 따라 자동 조정
  @media (min-width: 768px) {
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
