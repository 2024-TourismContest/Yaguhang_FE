import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { recommend, recommendSearch } from "../../apis/recommend";
import title from "../../assets/images/recommendTitle.svg";
import { Button } from "../../components/button/Button";
import { Filter } from "../../components/recommend/filter";
import { Item } from "../../components/recommend/Item";
import { Option } from "../../components/recommend/Option";
import Pagenation from "../../components/recommend/pagenation";
import { SearchInput } from "../../components/recommend/SearchInput";
import { RecommendPreviewDto } from "../../types/recommendType";

export const RecommendPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [recommendList, setRecommendList] = useState<RecommendPreviewDto[]>(); // 상태 추가
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

  const getRecommendList = async () => {
    try {
      const response = searchWord
        ? await recommendSearch({
            pagdIndex: 1,
            pageSize: 10,
            order: selectedOption,
            filter: selectedSpot,
            keyWord: searchWord,
          })
        : await recommend({
            pagdIndex: 1,
            pageSize: 10,
            order: selectedOption,
            filter: selectedSpot,
          });

      setLastPage(response.totalPage);
      setRecommendList(response.recommendPreviewDtos);
    } catch (error) {
      console.error("추천 리스트 가져오기 에러", error);
    }
  };

  useEffect(() => {
    getRecommendList();
  }, [selectedSpot, selectedOption]);
  const handleButtonClick = (page: string) => {
    navigate(`/${page}`);
  };
  return (
    <AppContainer>
      <TopSection>
        <img src={title} alt="title" />
        <Button
          bgColor="#a7cfec"
          color="black"
          text="나의 추천행 코스 만들기 >"
          fontWeight="bold"
          onClick={() => handleButtonClick("mycourse")}
          //추천행 만들기 페이지로
        />
      </TopSection>

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
      {lastPage != 0 ? (
        <ItemWrapper>
          {recommendList?.map((item, index) => (
            <Item
              key={item.recommendId}
              item={item}
              isLast={recommendList.length - 1 == index}
            />
          ))}
        </ItemWrapper>
      ) : (
        <Notice>검색 결과가 없습니다.</Notice>
      )}
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
  gap: 2.5vh;
`;
const Section = styled.section`
  margin-top: 70px;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;
const TopSection = styled.section`
  width: 100%;
  height: 45vh;
  background-color: #dce6f1;
  position: relative;
  img {
    position: absolute;
    top: 30%;
    left: 30%;
  }
  button {
    position: absolute;
    bottom: 5%;
    left: 32%;
  }
  @media (max-width: 500px) {
    margin-bottom: 1vh;
    img,
    button {
      width: 50%;
      font-size: x-small;
    }
    button {
      left: 30%;
    }
  }
`;
const Notice = styled.h5`
  color: white;
`;
