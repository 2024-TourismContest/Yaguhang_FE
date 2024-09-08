import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ball from "../../assets/icons/ball.svg";
import checkedball from "../../assets/icons/checkedball.svg";
import left from "../../assets/icons/left.png";
import right from "../../assets/icons/right.png";
import Category from "./Category";
import * as S from "../../styles/common/TitleSection";
import { toast } from "react-toastify";
import { fetchSchedules } from "../../apis/main";
import { scrapSchedule } from "../../apis/main";
import useTeamStore from "../../store/TeamStore";
import { teamLogos } from "../../types/teamLogos";
import { useNavigate } from "react-router-dom";

export interface Schedule {
  id: number;
  home: string;
  away: string;
  stadium: string;
  date: string;
  time: string;
  weather: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  weatherUrl: string;
  isScraped: boolean;
}

interface StyledCardProps {
  $isScraped: boolean;
}

const Card: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { selectedTeam, setSelectedGame, selectedGame } = useTeamStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSchedules = async () => {
      const schedules = await fetchSchedules(selectedTeam);
      setSchedules(schedules);
      setCurrentPage(0); // 팀이 변경될 때 페이지를 초기화
    };
    loadSchedules();
  }, [selectedTeam]); // selectedTeam이 변경될 때마다 경기일정 필터링

  const schedulesPerPage = 5;
  const indexOfLastSchedule = (currentPage + 1) * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
  const currentSchedules = schedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  const nextPage = () => {
    if (indexOfLastSchedule < schedules.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleScrapSchedule = async (gameId: number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      toast("로그인이 필요합니다");
      return;
    }
    try {
      const isScraped = await scrapSchedule(gameId);
      setSchedules((prevSchedules) =>
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

  //카드 클릭시 경기 날짜, 경기장 저장
  const handleCardClick = (schedule: Schedule) => {
    setSelectedGame({ id: schedule.id, date: schedule.date, stadium: schedule.stadium });
    console.log("선택된 게임:", {
      id: schedule.id,
      date: schedule.date,
      stadium: schedule.stadium,
    });
  };

  return (
    <>
      <Category filterSchedules={fetchSchedules} teamLogos={teamLogos} />{" "}
      <S.Wrapper gap="100px">
        <S.TitleWrapper>
          <S.Title style={{ color: "#ffffff" }}>오늘의 경기 일정</S.Title>
          <S.H4>
            열정과 감동을 선사하는 스포츠! 그 현장을 직접 경험해보세요!
          </S.H4>
        </S.TitleWrapper>
      </S.Wrapper>
      <CardContainer>
        <PrevButton onClick={prevPage} disabled={currentPage === 0}>
          <img src={left} alt="이전" />
        </PrevButton>
        {currentSchedules.map((schedule) => (
          <StyledCard
            key={schedule.id}
            $isScraped={schedule.isScraped}
            onClick={() => handleCardClick(schedule)}
            style={{
              border:
                selectedGame?.date === schedule.date &&
                selectedGame?.stadium === schedule.stadium
                  ? "5px solid #ffffff"
                  : "1px solid #ffffff",
              boxShadow:
                selectedGame?.date === schedule.date &&
                selectedGame?.stadium === schedule.stadium
                  ? "0 0 20px rgba(255, 255, 255, 0.7)"
                  : "none",
              transform:
                selectedGame?.date === schedule.date &&
                selectedGame?.stadium === schedule.stadium
                  ? "scale(1.05)"
                  : "scale(1)",
              backgroundColor:
                selectedGame?.date === schedule.date &&
                selectedGame?.stadium === schedule.stadium
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <BeforeElement
              $isScraped={schedule.isScraped}
              onClick={() => handleScrapSchedule(schedule.id)}
            />
            <div style={{ marginTop: "2rem" }}>
              <div>
                {schedule.stadium} | {schedule.time}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "2.5vh",
                }}
              >
                <img
                  src={schedule.homeTeamLogo}
                  alt={`${schedule.home}`}
                  style={{ width: "3rem", height: "2.5rem" }}
                />
                <span style={{ margin: "0 1rem" }}>VS</span>
                <img
                  src={schedule.awayTeamLogo}
                  alt={`${schedule.away}`}
                  style={{ width: "3rem", height: "2.5rem" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "10px",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ whiteSpace: "pre-line" }}>{schedule.home}</span>
                <span style={{ whiteSpace: "pre-line" }}>{schedule.away}</span>
              </div>
              <Divider />
              <DateAndWeatherContainer>
                <DateContainer>{schedule.date}</DateContainer>
                <WeatherIcon
                  src={schedule.weatherUrl}
                  alt={`${schedule.weather}`}
                />
              </DateAndWeatherContainer>
            </div>
          </StyledCard>
        ))}
        <NextButton
          onClick={nextPage}
          disabled={indexOfLastSchedule >= schedules.length}
        >
          <img src={right} alt="다음" />
        </NextButton>
      </CardContainer>
    </>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 50vh;
  overflow-x: auto;
`;

const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  width: 11vw;
  max-width: 11rem;
  height: 14vw;
  max-height: 14rem;
  background-color: #4a4a4a;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1rem;
  margin: 0.8rem;
  border: 1px solid #ffffff;
`;

const BeforeElement = styled.div<StyledCardProps>`
  position: absolute;
  top: -2.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 4rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.7);
  background-image: url(${(props) => (props.$isScraped ? checkedball : ball)});
  background-size: cover;
  z-index: 99;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin: 1.8rem 0;
`;

const DateContainer = styled.div`
  color: #fff;
  font-weight: 600;
  margin-right: 2.5rem;
`;

const WeatherIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const DateAndWeatherContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -1vh;
`;

const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;
const PrevButton = styled(PaginationButton)`
  left: 12vw;
`;

const NextButton = styled(PaginationButton)`
  right: 12vw;
`;
