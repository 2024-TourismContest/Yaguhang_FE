import { useEffect, useState } from "react";
import styled from "styled-components";
import { recommend } from "../../apis/recommend";
import { Filter } from "../../components/recommend/filter";
import { Item } from "../../components/recommend/Item";
import { Option } from "../../components/recommend/Option";
import Pagenation from "../../components/recommend/pagenation";
import { SearchInput } from "../../components/recommend/SearchInput";

export const RecommendPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(1);
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
      setLastPage(response.data.totalPage);
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
      <Pagenation
        lastPage={lastPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100%;
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
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const TopSection = styled.section`
  width: 100%;
  height: 30vh;
  background-color: #a7cfec;
  @media (max-width: 1024px) {
    height: 10vh;
    margin-bottom: 1vh;
  }
`;
