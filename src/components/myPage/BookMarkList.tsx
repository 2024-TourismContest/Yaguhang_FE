import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImg from "../../assets/images/Detailnull.svg";
import leftIcon from "../../assets/icons/arrow_left.svg";
import rightIcon from "../../assets/icons/arrow_right.svg";
import { mypage } from "../../apis/mypage";
import { ScrapSpot } from "../../types/myPageType";
import { Link, useNavigate } from "react-router-dom";
import { MoreLink, NoDataMessage } from "../../styles/common/messageStyle";

const BookMarkList: React.FC = () => {
  const [scrapSpots, setScrapSpots] = useState<ScrapSpot[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScrapSpots = async () => {
      try {
        const myScrapSpotData = await mypage.MyBookMark(0, 10, "전체");
        setScrapSpots(myScrapSpotData.scrapSpots);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    fetchScrapSpots();
  }, []);

  const handleClick = (spot: ScrapSpot) => {
    const url = `/details/${spot.category}/${spot.contentId}?stadiumId=${spot.stadiumInfo.StadiumId}`;
    navigate(url);
  };

  // 스크롤 처리 함수
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth; // 부모 컨테이너의 너비로 스크롤 양 조정
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {scrapSpots.length > 0 ? (
        <>
          <Container>
            <Button onClick={() => handleScroll("left")}>
              <img src={leftIcon} alt="Left" />
            </Button>
            <SpotsContainer ref={scrollRef}>
              {scrapSpots.map((spot) => (
                <ContentWrapper
                  key={spot.contentId}
                  onClick={() => handleClick(spot)}
                >
                  <ImgWrapper>
                    <Img src={spot.image || defaultImg} alt={spot.title} />
                    <Gradient />
                    <Title>{spot.title}</Title>
                  </ImgWrapper>
                </ContentWrapper>
              ))}
            </SpotsContainer>
            <Button onClick={() => handleScroll("right")}>
              <img src={rightIcon} alt="Right" />
            </Button>
          </Container>
          <MoreLink to="/mypage/bookmark">+ 더보기</MoreLink>
        </>
      ) : (
        <NoDataMessage>추천 항목이 없습니다.</NoDataMessage>
      )}
    </div>
  );
};

export default BookMarkList;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SpotsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
  scroll-snap-type: x mandatory;
  transition: 0.2s ease-in-out;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 230px;
  width: 230px;
  min-width: calc((100% - 10px * (4 - 1)) / 4); /* 카드 너비 계산 */
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;

  @media (max-width: 1000px) {
    flex: 1 0 calc(33.33% - 10px);
  }

  @media (max-width: 600px) {
    flex: 1 0 calc(50% - 10px);
  }

  @media (max-width: 400px) {
    flex: 1 0 100%;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  border-radius: 8px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s ease-in-out;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.8));
    height: 100%;
  }
`;

const Title = styled.h2`
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 1rem;
  color: white;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  @media (max-width: 768px) {
    img {
      width: 30px;
    }
  }
`;
