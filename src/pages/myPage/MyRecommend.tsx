import { useEffect, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import { mypage } from "../../apis/mypage";
import { RecommendPreviewDto } from "../../types/myPageType";
import { Item } from "../../components/recommend/Item"; // Item 컴포넌트 임포트
import { toast } from "react-toastify";

const MyRecommendPage: React.FC = () => {
  const [myRecommend, setMyRecommend] = useState<RecommendPreviewDto[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendData = await mypage.MyRecommend(100); // 원하는 수량으로 요청
        setMyRecommend(recommendData.recommendPreviewDtos);
      } catch (error) {
        console.error("추천행을 가져오는 중 오류 발생:", error);
        toast.error("추천행을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <>
      <SectionTitle
        title={"MY 추천행"}
        subtitle={"내가 추천행들을 모아보세요."}
      />
      <RecommendContainer>
        {myRecommend.length > 0 ? (
          myRecommend.map((recommend) => (
            <Item key={recommend.recommendId} item={recommend} isMine={true} isLast={false} />
          ))
        ) : (
          <NoDataMessage>추천행이 없습니다.</NoDataMessage>
        )}
      </RecommendContainer>
    </>
  );
};

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 30px;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
`;

export default MyRecommendPage;
