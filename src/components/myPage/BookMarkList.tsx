import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImg from "../../assets/images/Detailnull.svg";
import leftIcon from "../../assets/icons/arrow_left.svg";
import rightIcon from "../../assets/icons/arrow_right.svg";
import { mypage } from "../../apis/mypage";
import { ScrapSpot } from "../../types/myPageType";
import { Link, useNavigate } from "react-router-dom";

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
    const url = `/details/선수PICK/${spot.contentId}?stadiumId=${spot.stadiumInfo.StadiumId}`;
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
                <Img src={spot.image || defaultImg} alt={spot.title} />
                <Title>{spot.title}</Title>
              </ContentWrapper>
            ))}
          </SpotsContainer>
          <Button onClick={() => handleScroll("right")}>
            <img src={rightIcon} alt="Right" />
          </Button>
        </Container>
      ) : (
        <NoDataMessage>추천 항목이 없습니다.</NoDataMessage>
      )}
      <MoreLink to="/mypage/bookmark">+ 더보기</MoreLink>
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

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }
`;

const ContentWrapper = styled.div`
  min-width: calc((100% - 10px * (4 - 1)) / 4); /* 카드 너비 계산 */
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;

  @media (max-width: 1000px) {
    flex: 1 0 calc(33.33% - 10px); /* 3개 */
  }

  @media (max-width: 600px) {
    flex: 1 0 calc(50% - 10px); /* 2개 */
  }

  @media (max-width: 400px) {
    flex: 1 0 100%; /* 1개 */
  }
`;

const Img = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
  transition: 0.2s ease-in-out;
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

const MoreLink = styled(Link)`
  display: block;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
`;
