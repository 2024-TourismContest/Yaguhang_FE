import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { recommend, recommendSearch } from "../../apis/recommend";
import title from "../../assets/images/recommendBanner.svg";
import { Button } from "../../components/button/Button";
import { Filter } from "../../components/recommend/filter";
import { Item } from "../../components/recommend/Item";
import { Option } from "../../components/recommend/Option";
import Pagenation from "../../components/recommend/pagenation";
import { SearchInput } from "../../components/recommend/SearchInput";
import useAuthStore from "../../store/authStore";
import useModalStore from "../../store/modalStore";
import { RecommendPreviewDto } from "../../types/recommendType";

export const RecommendPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [recommendList, setRecommendList] = useState<RecommendPreviewDto[]>(); // 상태 추가
  const [searchWord, setSearchWord] = useState<string>("");

  const { isAuthenticated } = useAuthStore();
  const { openModal, closeModal } = useModalStore();

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
      console.log(currentPage);
      const response = searchWord
        ? await recommendSearch({
            pageIndex: currentPage,
            pageSize: 10,
            order: selectedOption,
            filter: selectedSpot,
            keyWord: searchWord,
          })
        : await recommend({
            pageIndex: currentPage,
            pageSize: 10,
            order: selectedOption,
            filter: selectedSpot,
          });

      setLastPage(response.totalPage);
      setRecommendList(response.recommendPreviewDtos);
      console.log(response);
    } catch (error) {
      console.error("추천 리스트 가져오기 에러", error);
    }
  };

  useEffect(() => {
    console.log(currentPage);
    getRecommendList();
  }, [selectedSpot, selectedOption, currentPage]);

  const onClickBtn = () => {
    if (!isAuthenticated) {
      openModal({
        title: "로그인 필요",
        content: "추천행 코스를 작성하시려면 로그인해주세요.",
        onConfirm: () => {
          navigate("/login");
          closeModal();
        },
        showCancel: true,
      });
    } else {
      navigate("/mycourse");
    }
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
          onClick={() => onClickBtn()}
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
  position: relative;
  img {
    width: 100%;
    margin: 0 auto;
  }
  button {
    position: absolute;
    bottom: 20%;
    left: 15%;
  }
  @media (max-width: 500px) {
    margin-bottom: 1vh;
    button {
      width: 50%;
      font-size: x-small;
    }
  }
`;
const Notice = styled.h5`
  color: white;
`;
