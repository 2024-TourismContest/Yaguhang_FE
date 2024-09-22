import React, { useEffect, useState } from "react";
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
import { Review, RecommendPreviewDto } from "../../types/myPageType";
import { Schedule } from "../../components/home/Card";
import { Link } from "react-router-dom";

const MyPageMain: React.FC = () => {
  const {
    preferTeam,
    setPreferTeam,
    isTeamSelectorActive,
    setTeamSelectorActive,
  } = useStore();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [myRecommend, setMyRecommend] = useState<RecommendPreviewDto[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);

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
        const myScrapSchedule = await mypage.MyScrap(0, 100);
        setSchedules(myScrapSchedule.scrappedSchedules);

        const myRecommendData = await mypage.MyRecommend(10);
        setMyRecommend(myRecommendData.recommendPreviewDtos);

        const myReviewsData = await mypage.MyReview();
        setMyReviews(myReviewsData.reviews);
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
      {schedules && schedules.length > 0 ? (
        <GameCardList
          schedules={schedules}
          onScrap={handleScrap}
          maxCardsPerPage={4}
        />
      ) : (
        <NoDataMessage>스크랩한 일정이 없습니다.</NoDataMessage>
      )}
      <Line />
      <SectionTitle title={"MY 추천행"} subtitle={"나의 여행 계획 모아보기"} />
      {myRecommend && myRecommend.length > 0 ? (
        <>
          {myRecommend.map((recommend, index) => (
            <Item
              key={recommend.recommendId}
              item={recommend}
              isLast={myRecommend.length - 1 === index}
              isMine={true}
            />
          ))}
          <MoreLink to="/mypage/recommend">+ 더보기</MoreLink>
        </>
      ) : (
        <NoDataMessage>추천 항목이 없습니다.</NoDataMessage>
      )}

      <Line />

      <SectionTitle title={"MY 북마크"} subtitle={"나의 북마크 목록"} />
      <BookMarkList />
      <Line />

      <SectionTitle title={"MY 야구행 리뷰"} />
      {myReviews && myReviews.length > 0 ? (
        <ReviewList>
          {myReviews.map((review) => (
            <ReviewItem
              stadiumId={0}
              isLiked={false}
              key={review.reviewId}
              {...review}
              isMine={true}
            />
          ))}
        </ReviewList>
      ) : (
        <NoDataMessage>작성한 리뷰가 없습니다.</NoDataMessage>
      )}
      <MoreLink to="/mypage/review">+ 더보기</MoreLink>
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

const MoreLink = styled(Link)`
  display: block;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
`;

export default MyPageMain;
