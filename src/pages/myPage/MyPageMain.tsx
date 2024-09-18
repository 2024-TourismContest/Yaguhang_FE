import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { teamLogos } from "../../types/teamLogos";
import TeamSelector from "../../components/myPage/TeamSelector";
import {
  myDummyReviews,
  dummyScrap,
  dummyScrapSpot,
} from "../../assets/data/dummyData";
import ReviewItem from "../../components/Review/ReviewItem";
import useStore from "../../store/PreferTeamStore";
import GameCardList from "../../components/myPage/GameCardList";
import BookMarkList from "../../components/myPage/BookMarkList";
import { toast } from "react-toastify";
import { scrapSchedule } from "../../apis/main";
import { useState } from "react";
interface Schedule {
  id: number;
  home: string;
  away: string;
  stadium: string;
  date: string;
  time: string;
  weather: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  weatherUrl: string;
  isScraped: boolean;
}

const MyPageMain = () => {
  const {
    preferTeam,
    setPreferTeam,
    isTeamSelectorActive,
    setTeamSelectorActive,
  } = useStore();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleScrap = async (gameId: number) => {
    try {
      const isScraped = await scrapSchedule(gameId);
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === gameId
            ? { ...schedule, isScraped: !schedule.isScraped }
            : schedule
        )
      );
      toast.success(
        isScraped ? "스크랩에 추가되었습니다." : "스크랩에서 제거되었습니다."
      );
    } catch (error) {
      toast.error("스크랩 중 오류가 발생했습니다.");
    }
  };

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
      <GameCardList
        schedules={dummyScrap}
        onScrap={handleScrap}
        maxCardsPerPage={4}
      />
      <Line />
      <SectionTitle title={"MY 추천행"} subtitle={"나의 여행 계획 모아보기"} />
      <Line />
      <SectionTitle title={"MY 북마크"} subtitle={"나의 여행 계획 모아보기"} />
      <BookMarkList data={dummyScrapSpot} />
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
  width: 100%;
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
