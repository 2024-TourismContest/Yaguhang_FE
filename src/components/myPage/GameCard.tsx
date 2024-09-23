import React from "react";
import styled from "styled-components";
import ball from "../../assets/icons/ball.svg";
import checkedball from "../../assets/icons/checkedball.svg";

interface GameCardProps {
  schedule: {
    id: number;
    home: string;
    away: string;
    stadium: string;
    date: string;
    time: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    weatherUrl: string;
    weather: string;
    isScraped: boolean;
  };
  isSelected?: boolean;
  onSelect?: (schedule: any) => void;
  onScrap: (id: number) => void;
  isScraped: boolean;
}
const GameCard: React.FC<GameCardProps> = ({
  schedule,
  isSelected = false,
  onScrap,
  onSelect,
}) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(schedule);
    }
  };

  return (
    <StyledCard onClick={handleCardClick} $isSelected={isSelected}>
      <BeforeElement
        onClick={(e) => {
          e.stopPropagation(); // 클릭 전파 방지
          onScrap(schedule.id);
        }}
        $isScraped={schedule.isScraped}
      />
      <div style={{ marginTop: "2rem" }}>
        <div>
          {schedule.stadium} | {schedule.time}
        </div>
        <Teams>
          <Team>
            <img src={schedule.homeTeamLogo} alt={schedule.home} />
            <p>{schedule.home}</p>
          </Team>
          <span>VS</span>
          <Team>
            <img src={schedule.awayTeamLogo} alt={schedule.away} />
            <p>{schedule.away}</p>
          </Team>
        </Teams>
        <Divider />
        <DateAndWeather>
          <p>{schedule.date}</p>
          <img src={schedule.weatherUrl} alt={schedule.weather} />
        </DateAndWeather>
      </div>
    </StyledCard>
  );
};
export default GameCard;

const StyledCard = styled.div<{ $isSelected: boolean }>`
  height: auto;
  padding: 1rem;
  border-radius: 1.25rem;
  text-align: center;
  color: white;
  border: 1px solid #fff;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.05)" : "scale(1)")};
  cursor: pointer;
  
  min-width: calc((100% - 10px * (4 - 1)) / 4); /* 카드 너비 계산 */
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  @media (max-width: 1300px) {
    flex: 1 0 calc(33.33% - 10px); /* 3개로 나누기 */
  }

  @media (max-width: 1000px) {
    flex: 1 0 calc(50% - 10px); /* 2개로 나누기 */
  }

  @media (max-width: 550px) {
    flex: 1 0 100%; /* 1개로 나누기 */
  }
`;

const BeforeElement = styled.div<{ $isScraped: boolean }>`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background-image: url(${($isScraped) => ($isScraped ? checkedball : ball)});
  background-size: cover;
  cursor: pointer;
`;

const Teams = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
  img {
    height: 2.5rem;
  }
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #fff;
  margin: 2.5rem 0 1.5rem 0;
`;

const DateAndWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 0.9rem;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
