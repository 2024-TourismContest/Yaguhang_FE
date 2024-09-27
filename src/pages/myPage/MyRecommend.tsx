import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { mypage } from "../../apis/mypage";
import { DeleteRecommendData } from "../../apis/recommend";
import SectionTitle from "../../components/common/SectionTitle";
import { Item } from "../../components/recommend/Item";
import { NoDataMessage } from "../../styles/common/messageStyle";
import { RecommendPreviewDto } from "../../types/myPageType";

const MyRecommendPage: React.FC = () => {
  const [myRecommend, setMyRecommend] = useState<RecommendPreviewDto[]>([]);
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
    const fetchRecommendations = async () => {
      try {
        const recommendData = await mypage.MyRecommend(100);
        setMyRecommend(recommendData.recommendPreviewDtos);
      } catch (error) {
        console.error("추천행을 가져오는 중 오류 발생:", error);
        toast.error("추천행을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchRecommendations();
  }, [deleteState]);

  return (
    <>
      <SectionTitle
        title={"MY 추천행"}
        subtitle={"내가 추천행들을 모아보세요."}
      />
      <ReviewList>
        {myRecommend.length > 0 ? (
          myRecommend.map((recommend, index) => (
            <Item
              key={recommend.recommendId}
              item={recommend}
              isMine={true}
              isLast={myRecommend.length - 1 == index}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <NoDataMessage>추천행이 없습니다.</NoDataMessage>
        )}
      </ReviewList>
    </>
  );
};

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default MyRecommendPage;
