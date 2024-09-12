import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchReviews } from "../../apis/review";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface ReviewListProps {
  contentId: number;
  sort: string; // 정렬 기준 (new, like, old)
}

interface ReviewData {
  user: {
    userId: number;
    nickname: string;
    image: string;
    fanTeam: string;
  };
  reviewId: number;
  isMine: boolean;
  isLiked: boolean;
  star: number;
  likeCount: number;
  createdAt: string;
  content: string;
  images: string[];
}

const ReviewList: React.FC<ReviewListProps> = ({ contentId, sort }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await fetchReviews(contentId, sort);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [contentId, sort]);

  //리뷰 좋아요
  const handleLikeToggle = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.reviewId === reviewId
          ? {
              ...review,
              isLiked: !review.isLiked,
              likeCount: review.isLiked
                ? review.likeCount - 1
                : review.likeCount + 1,
            }
          : review
      )
    );
  };

  if (loading) {
    return <div>리뷰 데이터를 불러오는 중...</div>;
  }

  return (
    <ListContainer>
      {reviews.length === 0 ? (
        <div>리뷰가 없습니다.</div>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review.reviewId}>
            <Author>{review.user.nickname}</Author>
            <Rating>⭐ {review.star}</Rating>
            <Content>{review.content}</Content>
            <ReviewDate>
              {new Date(review.createdAt).toLocaleDateString()}
            </ReviewDate>
            <Likes onClick={() => handleLikeToggle(review.reviewId)}>
              {review.isLiked ? <FaHeart /> : <FaRegHeart />} {review.likeCount}
              개
            </Likes>
          </ReviewItem>
        ))
      )}
    </ListContainer>
  );
};

export default ReviewList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 60vw;
`;

const ReviewItem = styled.div`
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
`;

const Author = styled.div`
  font-weight: bold;
`;

const Rating = styled.div`
  margin-top: 0.5rem;
`;

const Content = styled.p`
  margin-top: 0.5rem;
`;

const ReviewDate = styled.div`
  margin-top: 0.5rem;
  color: #888;
  font-size: 0.875rem;
`;

const Likes = styled.div`
  margin-top: 0.5rem;
  color: #ff6347;
  font-size: 0.875rem;
`;
