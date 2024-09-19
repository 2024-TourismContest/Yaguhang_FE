import { useEffect, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { teamLogos } from "../../types/teamLogos";
import TeamSelector from "../../components/myPage/TeamSelector";
import ReviewItem from "../../components/Review/ReviewItem";
import useStore from "../../store/PreferTeamStore";
import GameCardList from "../../components/myPage/GameCardList";
import BookMarkList from "../../components/myPage/BookMarkList";
import { toast } from "react-toastify";
import { scrapSchedule } from "../../apis/main";
import { mypage } from "../../apis/mypage";
import { Item } from "../../components/recommend/Item";
import { Review } from "../../types/myPageType";
import { Schedule } from "../../components/home/Card";

const MyPageMain = () => {
  const {
    preferTeam,
    setPreferTeam,
    isTeamSelectorActive,
    setTeamSelectorActive,
  } = useStore();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [myRecommend, setMyRecommend] = useState([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [myScrapSpots, setMyScrapSpots] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myRecommendData = await mypage.MyRecommend(10);
        setMyRecommend(myRecommendData.recommendPreviewDtos);

        const myReviewsData = await mypage.MyReview();
        setMyReviews(myReviewsData.reviews);

        const myScrapSpotData = await mypage.MyBookMark();
        setMyScrapSpots(myScrapSpotData);

        const myScrapSchedule = await mypage.MyScrap(1, 10);
        setSchedules(myScrapSchedule);
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

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
        schedules={schedules}
        onScrap={handleScrap}
        maxCardsPerPage={4}
      />

      <Line />

      <SectionTitle title={"MY 추천행"} subtitle={"나의 여행 계획 모아보기"} />
      {myRecommend?.map((recommend, index) => (
        <Item
          key={recommend.recommendId}
          item={recommend}
          isLast={myRecommend.length - 1 === index}
          isMine={true}
        />
      ))}

      <Line />

      <SectionTitle title={"MY 북마크"} subtitle={"나의 여행 계획 모아보기"} />
      <BookMarkList data={myScrapSpots} />

      <SectionTitle title={"MY 야구행 리뷰"} />
      <ReviewList>
        {myReviews?.map((review) => (
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
