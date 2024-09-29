import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DeleteRecommendData } from "../../apis/recommend";
import SectionTitle from "../../components/common/SectionTitle";
import TeamSelector from "../../components/myPage/TeamSelector";
import ReviewItem from "../../components/Review/ReviewItem";
import useStore from "../../store/PreferTeamStore";
import StampList from "../../components/myPage/StampList";
import BookMarkList from "../../components/myPage/BookMarkList";
import { toast } from "react-toastify";
import { mypage } from "../../apis/mypage";
import { Item } from "../../components/recommend/Item";
import { Review, RecommendPreviewDto } from "../../types/myPageType";
import { Schedule } from "../../components/home/Card";
import { MoreLink, NoDataMessage } from "../../styles/common/messageStyle";
import { teamLogos } from "../../types/teamLogos";

const MyPageMain: React.FC = () => {
  const {
    preferTeam,
    setPreferTeam,
    isTeamSelectorActive,
    setTeamSelectorActive,
  } = useStore();
  const [myRecommend, setMyRecommend] = useState<RecommendPreviewDto[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [, setMyScrapGames] = useState<Schedule[]>([]);
  const [deleteState, setDeleteState] = useState(true);
  const handleDelete = async (recommendId: number) => {
    const confirmDelete = window.confirm("이 리뷰를 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await DeleteRecommendData(recommendId);
      setDeleteState((prev) => !prev);
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myRecommendData = await mypage.MyRecommend(10);
        setMyRecommend(myRecommendData.recommendPreviewDtos);
        console.log(myRecommendData.recommendPreviewDtos);

        const myReviewsData = await mypage.MyReview();
        setMyReviews(myReviewsData.reviews);
        const myScrapSchedule = await mypage.MyScrap(0, 100);
        setMyScrapGames(myScrapSchedule.scrappedSchedules);
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, [deleteState]);

  return (
    <MainPageContainer>
      <SectionTitle title={"관심 있는 구단"} />
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
      <StampList />
      <Line />
      <SectionTitle title={"MY 추천행"} subtitle={"나의 여행 계획 모아보기"} />
      {myRecommend && myRecommend.length > 0 ? (
        <>
          {myRecommend?.map((recommend, index) => (
            <Item
              key={recommend.recommendId}
              item={recommend}
              isLast={myRecommend.length - 1 === index}
              isMine={true}
              handleDelete={handleDelete}
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
        <>
          <ReviewList>
            {myReviews.slice(0, 2).map((review) => (
              <ReviewItem key={review.reviewId} isMine={true} {...review} />
            ))}
          </ReviewList>
          <MoreLink to="/mypage/review">+ 더보기</MoreLink>
        </>
      ) : (
        <NoDataMessage>리뷰가 없습니다.</NoDataMessage>
      )}
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  max-width: 100%;
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
