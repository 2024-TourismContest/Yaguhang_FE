import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImg from "../../assets/images/Detailnull.svg";
import leftIcon from "../../assets/icons/left.svg";
import rightIcon from "../../assets/icons/right.svg";
import { mypage } from "../../apis/mypage";
import { ScrapSpot } from "../../types/myPageType";

const BookMarkList: React.FC = () => {
  const [scrapSpots, setScrapSpots] = useState<ScrapSpot[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 4 * 240; // 4 items * (item width + gap)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => handleScroll("left")}>
          <img src={leftIcon} alt="Left" />
        </Button>
      </ButtonContainer>
      <SpotsContainer ref={scrollRef}>
        {scrapSpots.map((spot) => (
          <ContentWrapper key={spot.contentId}>
            <Img src={spot.image || defaultImg} alt={spot.title} />
            <Title>{spot.title}</Title>
          </ContentWrapper>
        ))}
      </SpotsContainer>
      <ButtonContainer>
        <Button onClick={() => handleScroll("right")}>
          <img src={rightIcon} alt="Right" />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default BookMarkList;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

const SpotsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
  }
`;

const ContentWrapper = styled.div`
  min-width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;
`;

const Img = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h2`
  max-width: 100%;
  padding-top: 0.5rem;
  text-align: center;
  font-size: 1rem;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
