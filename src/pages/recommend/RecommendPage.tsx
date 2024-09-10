import { useEffect, useState } from "react";
import styled from "styled-components";
import { recommend } from "../../apis/recommend";
import { Filter } from "../../components/recomment/filter";
import { Item } from "../../components/recomment/Item";

export const RecommendPage = () => {
  const [recommendList, setRecommendList] = useState([]); // 상태 추가
  const [selectedSpot, setSelectedSpot] = useState("전체");
  const hadleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
  };

  useEffect(() => {
    const getRecommendList = async () => {
      console.log("실행됨");
      try {
        const response = await recommend({
          pagdIndex: 1,
          pageSize: 10,
          order: "인기순",
          filter: selectedSpot,
        });
        setRecommendList(response.data.recommendPreviewDtos); // 데이터 저장
      } catch (error) {}
    };

    getRecommendList();
  }, []);

  return (
    <AppContainer>
      <TopSection />
      <Filter selectedSpot={selectedSpot} hadleSpotChange={hadleSpotChange} />
      <ItemWrapper>
        {recommendList.map((item) => (
          <Item key={item} item={item} /> // 각 항목을 Item 컴포넌트로 전달
        ))}
      </ItemWrapper>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
`;
const ItemWrapper = styled.div`
  display: grid;
  gap: 4vh;
`;
const TopSection = styled.section`
  width: 100vw;
  height: 30vh;
  background-color: #a7cfec;
  @media (max-width: 1024px) {
    height: 10vh;
    margin-bottom: 1vh;
  }
`;
