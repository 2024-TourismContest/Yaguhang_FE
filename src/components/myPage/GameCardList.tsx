import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GameCard from "./GameCard";
import leftIcon from "../../assets/icons/arrow_left.svg";
import rightIcon from "../../assets/icons/arrow_right.svg";
import { Schedule } from "../home/Card";
import { mypage } from "../../apis/mypage";
import { scrapSchedule } from "../../apis/main";
import { toast } from "react-toastify";

const CardList: React.FC = () => {
  const [games, setGames] = useState<Schedule[]>([]);
  const [selectedGame, setSelectedGame] = useState<Schedule | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchScrapSpots = async () => {
      try {
        const myScrapSchedule = await mypage.MyScrap(0, 100);
        setGames(myScrapSchedule.scrappedSchedules);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    fetchScrapSpots();
  }, []);

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
        prevSchedules.map((schedule) =>
          schedule.id === gameId
            ? { ...schedule, isScraped: !schedule.isScraped }
            : schedule
        )
      );
      toast.success(
        isScraped ? "스크랩에 추가되었습니다." : "스크랩에서 제거되었습니다."
      );
    } catch (error) {
      toast.error("스크랩 중 오류가 발생했습니다.");
    }
  };

  const handleSelect = (schedule: Schedule) => {
    setSelectedGame(schedule);
  };

  return (
    <CarouselContainer>
      <Button onClick={() => handleScroll("left")}>
        <img src={leftIcon} alt="Left" />
      </Button>
      <CardContainer ref={scrollRef}>
        {games.map((schedule) => (
          <GameCard
            key={schedule.id}
            schedule={schedule}
            isSelected={selectedGame?.id === schedule.id}
            onScrap={handleScrap}
            onSelect={handleSelect}
            isScraped={schedule.isScraped}
          />
        ))}
      </CardContainer>
      <Button onClick={() => handleScroll("right")}>
        <img src={rightIcon} alt="Right" />
      </Button>
    </CarouselContainer>
  );
};
export default CardList;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CardContainer = styled.div`
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
