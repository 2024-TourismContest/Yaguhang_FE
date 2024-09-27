import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SpotCard from "./SpotCard";
import leftIcon from "../../assets/icons/arrow_left.svg";
import rightIcon from "../../assets/icons/arrow_right.svg";
import { mypage } from "../../apis/mypage";
import { ScrapSpot } from "../../types/myPageType";
import { useNavigate } from "react-router-dom";
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

  const defaultImg =
    "https://yaguhang.kro.kr:8443/defaultLogos/defaultBookmarkImage.svg";

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
                <SpotCard
                  key={spot.contentId}
                  spot={spot}
                  defaultImg={defaultImg}
                  handleClick={handleClick}
                />
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
