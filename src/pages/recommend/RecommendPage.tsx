import { useEffect, useState } from "react";
import styled from "styled-components";
import { recommend } from "../../apis/recommend";
import { Filter } from "../../components/recomment/filter";
import { Item } from "../../components/recomment/Item";
import { Option } from "../../components/recomment/Option";
import { SearchInput } from "../../components/recomment/SearchInput";

export const RecommendPage = () => {
  const [recommendList, setRecommendList] = useState([]); // 상태 추가
  const [searchWord, setSearchWord] = useState<string>("");
  4;
  const [selectedOption, setOption] = useState<string>("인기순");
  const [selectedSpot, setSelectedSpot] = useState("전체");
  const handleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
  };
  const handleInputChange = (word: string) => {
    setSearchWord(word);
  };
  const handleOptionChange = (option: string) => {
    setOption(option);
  };
  useEffect(() => {
    getRecommendList();
    console.log("실행");
  }, [selectedSpot, selectedOption]);

  //데이터 fetching
  const getRecommendList = async () => {
    console.log("실행됨");
    try {
      const response = await recommend({
        pagdIndex: 1,
        pageSize: 10,
        order: selectedOption,
        filter: selectedSpot,
      });
      setRecommendList(response.data.recommendPreviewDtos); // 데이터 저장
    } catch (error) {}
  };

  return (
    <AppContainer>
      <TopSection />
      <Section>
        <Filter
          selectedSpot={selectedSpot}
          handleSpotChange={handleSpotChange}
        />
        <SearchInput
          handleInputChange={handleInputChange}
          getRecommendList={getRecommendList}
          searchWord={searchWord}
        />
      </Section>
      <Option
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
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
`;
const ItemWrapper = styled.div`
  display: grid;
  gap: 4vh;
`;
const Section = styled.section`
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 15px;
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
