import { useEffect, useState } from "react";
import ReviewItem from "../../components/Review/ReviewItem";
import styled from "styled-components";
import { mypage } from "../../apis/mypage";
import { Review } from "../../types/myPageType";
import SectionTitle from "../../components/common/SectionTitle";

const MyReview = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const myReviewsData = await mypage.MyReview();
        setMyReviews(myReviewsData.reviews);
        console.log(myReviewsData);
      } catch (error) {
        console.error("리뷰를 가져오는 중 오류 발생:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <SectionTitle
        title={"MY 리뷰"}
        subtitle={"내가 작성한 리뷰를 확인하세요."}
      />
      <ReviewsContainer>
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <ReviewItem key={review.reviewId} isMine={true} {...review} />
          ))
        ) : (
          <NoReviewsMessage>리뷰가 없습니다.</NoReviewsMessage>
        )}
      </ReviewsContainer>
    </>
  );
};

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 30px;
`;

const NoReviewsMessage = styled.p`
  color: #aaa;
  text-align: center;
`;

export default MyReview;
