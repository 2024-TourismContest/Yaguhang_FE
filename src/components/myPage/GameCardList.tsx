import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GameCard from "./GameCard";
import leftIcon from "../../assets/icons/arrow_left.svg";
import rightIcon from "../../assets/icons/arrow_right.svg";
import { Schedule } from "../home/Card";
import { mypage } from "../../apis/mypage";
import { scrapSchedule } from "../../apis/main";
import { toast } from "react-toastify";
import { NoDataMessage } from "../../styles/common/messageStyle";

const CardList: React.FC = () => {
  const [games, setGames] = useState<Schedule[]>([]);
  const [page,] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScrapSpots = async (page: number) => {
      setLoading(true); // 로딩 시작
      try {
        const myScrapSchedule = await mypage.MyScrap(page, 100);

        // 페이지가 0일 때는 이전 데이터를 초기화하고, 이후 페이지에서는 데이터 추가
        setGames((prevGames) =>
          page === 0
            ? myScrapSchedule.scrappedSchedules
            : [...prevGames, ...myScrapSchedule.scrappedSchedules]
        );
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
        toast.error("데이터를 불러오는 중 오류가 발생했습니다."); // 오류 메시지
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchScrapSpots(page);
  }, [page]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrap = async (gameId: number) => {
    try {
      const isScraped = await scrapSchedule(gameId);
      setGames((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.id !== gameId)
      );
      toast.success(
        isScraped ? "스크랩에 추가되었습니다." : "스크랩에서 제거되었습니다."
      );
    } catch (error) {
      toast.error("스크랩 중 오류가 발생했습니다.");
    }
  };

  return (
    <CarouselContainer>
      {games.length === 0 && !loading ? (
        <NoDataMessage>경기 스탬프가 없습니다</NoDataMessage>
      ) : (
        <>
          <Button onClick={() => handleScroll("left")}>
            <img src={leftIcon} alt="Left" />
          </Button>
          <CardContainer ref={scrollRef}>
            {games.map((schedule) => (
              <GameCard
                key={schedule.id}
                schedule={schedule}
                onScrap={handleScrap}
                isScraped={schedule.isScraped}
              />
            ))}
          </CardContainer>
          <Button onClick={() => handleScroll("right")}>
            <img src={rightIcon} alt="Right" />
          </Button>
        </>
      )}
    </CarouselContainer>
  );
};

export default CardList;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 40px 0;
  scroll-snap-type: x mandatory;
  transition: 0.2s ease-in-out;

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
