import { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { fetchReviews } from "../../apis/review";

interface ReviewProps {
  contentId: number;
  stadiumId: number; // stadiumId 추가
}

const Review: React.FC<ReviewProps> = ({ contentId, stadiumId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [sort, setSort] = useState<string>("new"); // 정렬 기준 상태

  const loadReviews = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      const newReviews = await fetchReviews(contentId, sort);
      setReviews(newReviews);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  useEffect(() => {
    loadReviews();
  }, [contentId, sort]);

  const handleReviewSuccess = async () => {
    await loadReviews(); // 리뷰 작성 후 데이터 새로 로드
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort); // 정렬 기준 업데이트
  };

  return (
    <div>
      <ReviewContainer>
        <Header>
          <Title>야구행 리뷰</Title>
          <SortOptions>
            <span onClick={() => handleSortChange("new")}>최신순</span> |{" "}
            <span onClick={() => handleSortChange("like")}>인기순</span>
          </SortOptions>
        </Header>

        <ReviewForm
          contentId={contentId}
          stadiumId={stadiumId} // stadiumId 전달
          onSubmitSuccess={handleReviewSuccess}
        />

        {loading ? (
          <div>리뷰 데이터를 불러오는 중...</div>
        ) : (
          <ReviewList contentId={contentId} sort={sort} />
        )}
      </ReviewContainer>
    </div>
  );
};

export default Review;

const ReviewContainer = styled.div`
  margin-top: 1.5rem;
  padding: 0.5rem;
  color: white;
  border-radius: 8px;
  max-width: 800px;
  background-color: blue;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const SortOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;

  span {
    cursor: pointer;
    color: #ccc;
    &:hover {
      color: white;
    }
  }
`;
