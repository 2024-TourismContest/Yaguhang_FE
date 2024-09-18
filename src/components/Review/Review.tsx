import { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { fetchReviews } from "../../apis/review";
import { IoBaseballOutline } from "react-icons/io5";

interface ReviewProps {
  contentId: number;
  stadiumId: number;
  id?: string;
}

const Review: React.FC<ReviewProps> = ({ contentId, stadiumId, id }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [sort, setSort] = useState<string>("new"); // 정렬 기준 상태

  //리뷰 정렬
  const loadReviews = async () => {
    try {
      setLoading(true);
      const newReviews = await fetchReviews(contentId, sort);
      setReviews(newReviews);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
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
    <div id={id}>
      <ReviewContainer>
        <Header>
          <Title>
            <IoBaseballOutline style={{ fontSize: "3rem" }} />
            야구행 리뷰
          </Title>
          <SortOptions>
            <span onClick={() => handleSortChange("new")}>최신순</span> |{" "}
            <span onClick={() => handleSortChange("like")}>인기순</span>
          </SortOptions>
        </Header>

        <ReviewForm
          contentId={contentId}
          stadiumId={stadiumId}
          onSubmitSuccess={handleReviewSuccess}
        />

        {loading ? (
          <div>리뷰 데이터를 불러오는 중...</div>
        ) : (
          <ReviewList contentId={contentId} sort={sort} reviews={reviews} />
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
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
