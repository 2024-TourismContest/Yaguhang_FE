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
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(maxCardsPerPage);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(2);
      } else if (window.innerWidth <= 1024) {
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
  }, [cardsPerPage]);

  useEffect(() => {
    if (currentPage > Math.floor(schedules.length / cardsPerPage)) {
      setCurrentPage(0);
    }
  }, [cardsPerPage, schedules.length]);

  const indexOfLastCard = (currentPage + 1) * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = schedules.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    if (indexOfLastCard < schedules.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <NavButton onClick={prevPage} disabled={currentPage === 0}>
        <img src={left} alt="이전" />
      </NavButton>
      <CardContainer>
        {currentCards.map((schedule) => (
          <GameCard
            key={schedule.id}
            schedule={schedule}
            isSelected={selectedGame?.id === schedule.id}
            onScrap={onScrap}
            onSelect={onSelect}
          />
        ))}
      </CardContainer>
      <NavButton
        onClick={nextPage}
        disabled={indexOfLastCard >= schedules.length}
      >
        <img src={right} alt="다음" />
      </NavButton>
    </Container>
  );
};

export default CardList;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const NavButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
