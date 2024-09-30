import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  DeleteRecommendData,
  recommend,
  recommendSearch,
} from "../../apis/recommend";
import title from "../../assets/images/recommendBanner(Web).svg";
import title2 from "../../assets/images/recommendBanner(mobile).svg";
import { Button } from "../../components/button/Button";
import { Filter } from "../../components/recommend/filter";
import { Item } from "../../components/recommend/RecommendItem";
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
  const [deleteState, setDeleteState] = useState(true);
  const itemWrapperRef = useRef<HTMLDivElement>(null);

  // 화면 크기에 따라 배너 이미지를 변경하기 위한 상태
  const [bannerSrc, setBannerSrc] = useState<string>(title);

  const handleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
  };
  const handleInputChange = (word: string) => {
    setSearchWord(word);
  };
  const handleOptionChange = (option: string) => {
    setOption(option);
  };

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

  const getRecommendList = async () => {
    try {
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
    } catch (error) {
      console.error("추천 리스트 가져오기 에러", error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    getRecommendList();
  }, [selectedSpot, selectedOption]);

  useEffect(() => {
    getRecommendList();
    if (itemWrapperRef.current) {
      itemWrapperRef.current.scrollIntoView({ behavior: "smooth" }); // ItemWrapper로 스크롤
    }
  }, [currentPage, deleteState]);

  // 화면 크기에 따라 배너 이미지를 동적으로 변경
  useEffect(() => {
    const updateBannerSrc = () => {
      if (window.innerWidth <= 768) {
        setBannerSrc(title2); // 모바일용 이미지
      } else {
        setBannerSrc(title); // 웹용 이미지
      }
    };

    updateBannerSrc(); // 초기 로딩 시 배너 설정
    window.addEventListener("resize", updateBannerSrc); // 창 크기 변경 시 배너 설정

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", updateBannerSrc);
  }, []);

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
        <img src={bannerSrc} alt="title" />
        <Button
          bgColor="#a7cfec"
          color="black"
          text="나의 추천행 코스 만들기 >"
          fontWeight="bold"
          onClick={() => onClickBtn()}
        />
      </TopSection>

      <Section ref={itemWrapperRef}>
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
      {lastPage != 0 ? (
        <ItemWrapper>
          <Option
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
          {recommendList?.map((item, index) => (
            <Item
              key={item.recommendId}
              item={item}
              isLast={recommendList.length - 1 == index}
              handleDelete={handleDelete}
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
  width: 60vw;
`;

const Section = styled.section`
  margin-top: 50px;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const TopSection = styled.section`
  width: 100%;
  position: relative;
  margin-top: 5vh;

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
  margin-top: 0;
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
