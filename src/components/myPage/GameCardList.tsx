import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GameCard from "./GameCard";
import left from "../../assets/icons/left.png";
import right from "../../assets/icons/right.png";

interface CardListProps {
  schedules: any[];
  maxCardsPerPage: number;
  onScrap: (id: number) => void;
  onSelect?: (schedule: any) => void;
  selectedGame?: any;
}

const CardList: React.FC<CardListProps> = ({
  schedules,
  maxCardsPerPage,
  onScrap,
  onSelect,
  selectedGame,
}) => {
  // Ensure schedules is an array
  const validSchedules = Array.isArray(schedules) ? schedules : [];

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(maxCardsPerPage);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setCardsPerPage(1);
      } else if (width <= 1250) {
        setCardsPerPage(2);
      } else if (width <= 1500) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(maxCardsPerPage);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
    };
  }, [maxCardsPerPage]);

  const totalPages = Math.ceil(validSchedules.length / cardsPerPage);
  const currentCards = validSchedules.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <CarouselContainer>
      <NavButton onClick={prevPage} disabled={currentPage === 0}>
        <img src={left} alt="Prev" />
      </NavButton>
      <CardContainer>
        {currentCards?.map((schedule) => (
          <GameCard
            key={schedule.id}
            schedule={schedule}
            isSelected={selectedGame?.id === schedule.id}
            onScrap={onScrap}
            onSelect={onSelect}
          />
        ))}
      </CardContainer>
      <NavButton onClick={nextPage} disabled={currentPage === totalPages - 1}>
        <img src={right} alt="Next" />
      </NavButton>
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

  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
