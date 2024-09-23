import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "../../components/layout/MenuItem";
import ProfileSection from "../../components/myPage/ProfileSection";
import useModalStore from "../../store/modalStore";
import useStore from "../../store/PreferTeamStore";
import { mypage } from "../../apis/mypage";

const MyPageLayout = () => {
  const { openModal, closeModal } = useModalStore();
  const { preferTeam, setTeamSelectorActive, isTeamSelectorActive } = useStore();
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
        showCancel: true,
      });
    } else {
      setTeamSelectorActive(!isTeamSelectorActive);
    }
  };

  const handleProfileUpdate = async (
    nickname: string,
    image: string | null
  ) => {
    try {
      await mypage.EditProfile(nickname, image!);
      alert("프로필 수정이 완료되었습니다.");
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <PageContainer>
      <MenuContainer>
        <Title>
          <Link to="/mypage">마이페이지</Link>
        </Title>
        <ProfileSection
          preferTeam={preferTeam}
          onTeamClick={handleTeamClick}
          onProfileUpdate={handleProfileUpdate}
        />
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
  flex-direction: row;
  margin: 20vh 5vw;
  gap: 4vw;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20vh 10vw;
  }
`;

const MenuContainer = styled.div`
  flex: 1;
  min-width: 240px;
`;

const ContentContainer = styled.div`
  flex: 5;
  overflow: hidden;
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
