import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ReviewProps {
  contentId: number;
  id?: string;
}

interface ReviewData {
  reviewId: number;
  authorName: string;
  profileImage: string;
  createdAt: string;
  content: string;
  images: string[];
  rating: number;
  likes: number;
  isMine: boolean;
  isLiked: boolean;
}

const dummyReviews: ReviewData[] = [
  {
    reviewId: 1,
    authorName: "양두영",
    profileImage: "image.jpg",
    createdAt: "2024-07-03T12:34:56Z",
    content: "리뷰 본문 내용 여기에 작성",
    images: ["image_url_1", "image_url_2", "image_url_3"],
    rating: 4.5,
    likes: 256,
    isMine: false,
    isLiked: false,
  },
  {
    reviewId: 2,
    authorName: "영두양",
    profileImage: "image.jpg",
    createdAt: "2024-07-03T12:34:56Z",
    content: "리뷰 본문 내용 여기에 작성",
    images: ["image_url_1", "image_url_2", "image_url_3"],
    rating: 4.5,
    likes: 256,
    isMine: false,
    isLiked: false,
  },
];

const Review: React.FC<ReviewProps> = ({ contentId, id }) => {
  const [reviews, setReviews] = useState<ReviewData[]>(dummyReviews);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    const newReviewData: ReviewData = {
      reviewId: reviews.length + 1,
      authorName: "내 이름", // 실제 사용자 이름으로 대체
      profileImage: "my_profile_image.jpg", // 실제 사용자 프로필 이미지로 대체
      createdAt: new Date().toISOString(),
      content: newReview,
      images: [], // 이미지 URL 배열
      rating,
      likes: 0,
      isMine: true,
      isLiked: false,
    };
    setReviews([newReviewData, ...reviews]);
    setNewReview("");
    setRating(0);
  };

  return (
    <div id={id}>
      <ReviewContainer>
        <ReviewHeader>
          <ReviewInput
            placeholder="여기를 클릭해서 리뷰를 입력하세요. (최대 300자)"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <RatingInput
            type="number"
            placeholder="평점 (0-5)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <SubmitButton onClick={handleReviewSubmit}>리뷰 작성</SubmitButton>
        </ReviewHeader>
        <ReviewList>
          {reviews.map((review) => (
            <ReviewItem key={review.reviewId}>
              <ReviewTitle>{review.authorName}</ReviewTitle>
              <ReviewRating>⭐ {review.rating}</ReviewRating>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewItem>
          ))}
        </ReviewList>
      </ReviewContainer>
    </div>
  );
};

export default Review;

const ReviewContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  color: white;
  border-radius: 8px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SortOptions = styled.div`
  span {
    cursor: pointer;
    margin-left: 0.5rem;
  }
`;

const ReviewInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: white;
  resize: none;
`;

const RatingInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: white;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: white;
  cursor: pointer;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewItem = styled.div`
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2c2c2c;
`;

const ReviewTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const ReviewRating = styled.div`
  margin: 0.5rem 0;
`;

const ReviewContent = styled.p`
  margin: 0;
  font-size: 1rem;
`;
