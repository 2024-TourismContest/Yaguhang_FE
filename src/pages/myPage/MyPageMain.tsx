import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { teamLogos } from "../../types/teamLogos";
import TeamSelector from "../../components/common/TeamSelector";
import { myDummyReviews } from "../../assets/data/dummyReviews";
import ReviewItem from "../../components/detail/Review/ReviewItem";
import useStore from "../../store/preferTeamStore";
const MyPageMain = () => {
  const {
    preferTeam,
    setPreferTeam,
    isTeamSelectorActive,
    setTeamSelectorActive,
  } = useStore();

  return (
    <MainPageContainer>
      <SectionTitle title={"관심 있는 구장"} />
      <TeamSelector
        selectedTeam={preferTeam}
        setSelectedTeam={setPreferTeam}
        teamLogos={teamLogos}
        showAllButton={false}
        isEnabled={isTeamSelectorActive}
        setIsEnabled={setTeamSelectorActive}
      />
      <SectionTitle
        title={"MY 야구공 스탬프"}
        subtitle={"관심 있는 야구 일정 모아보기"}
      />
      <Line />
      <SectionTitle title={"MY 추천행"} subtitle={"나의 여행 계획 모아보기"} />
      <Line />
      <SectionTitle title={"MY 북마크"} subtitle={"나의 여행 계획 모아보기"} />
      <SectionTitle title={"MY 야구행 리뷰"} />
      <ReviewList>
        {myDummyReviews.map((review) => (
          <ReviewItem key={review.reviewId} {...review} />
        ))}
      </ReviewList>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #686868;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default MyPageMain;
