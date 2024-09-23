import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { fetchSchedules, scrapSchedule } from "../../apis/main";
import ball from "../../assets/icons/ball.svg";
import checkedball from "../../assets/icons/checkedball.svg";
import left from "../../assets/icons/left.png";
import right from "../../assets/icons/right.png";
import useTeamStore from "../../store/TeamStore";
import * as S from "../../styles/common/TitleSection";
import { teamLogos } from "../../types/teamLogos";
import Category from "./Category";

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
  const [schedulesPerPage, setSchedulesPerPage] = useState(5); // 한 페이지에 보여줄 카드 개수
  const { selectedTeam, setSelectedGame, selectedGame } = useTeamStore();
  const navigate = useNavigate();

  // 화면 크기에 따라 카드 개수를 설정하는 함수
  const updateSchedulesPerPage = () => {
    if (window.innerWidth <= 768) {
      setSchedulesPerPage(2); // 모바일 화면에서는 카드 2개
    } else if (window.innerWidth <= 1024) {
      setSchedulesPerPage(3); // 태블릿 화면에서는 카드 3개
    } else {
      setSchedulesPerPage(5); // 데스크탑에서는 카드 5개
    }
  };

  useEffect(() => {
    const loadSchedules = async () => {
      const schedules = await fetchSchedules(selectedTeam);
      setSchedules(schedules);
      setCurrentPage(0); // 팀이 변경될 때 페이지를 초기화
    };
    loadSchedules();
  }, [selectedTeam]);

  useEffect(() => {
    if (schedules.length > 0) {
      setSelectedGame({
        id: schedules[0].id,
        date: schedules[0].date,
        stadium: schedules[0].stadium,
      });
    }
  }, [schedules]);

  useEffect(() => {
    // 페이지 크기 변화 감지 및 한 페이지에 보여줄 카드 개수 조정
    updateSchedulesPerPage();
    window.addEventListener("resize", updateSchedulesPerPage);
    return () => window.removeEventListener("resize", updateSchedulesPerPage);
  }, []);

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
    const token = localStorage.getItem("token");

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

  const handleCardClick = (schedule: Schedule) => {
    setSelectedGame({
      id: schedule.id,
      date: schedule.date,
      stadium: schedule.stadium,
    });
    console.log("선택된 게임:", {
      id: schedule.id,
      date: schedule.date,
      stadium: schedule.stadium,
    });
  };

  return (
    <>
      <Category filterSchedules={fetchSchedules} teamLogos={teamLogos} />
      <S.Wrapper>
        <S.TitleWrapper style={{ marginTop: "-100px" }}>
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
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(255, 255, 255, 0.1)",
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
  margin-top: -50px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -30px;
`;
const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  width: 11vw;
  max-width: 11rem;
  height: 14vw;
  max-height: 14rem;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid #ffffff;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #4e4e4e !important;
    transform: scale(1.05) !important;
  }

  @media (max-width: 1024px) {
    width: 18vw;
    height: 22vw;
  }

  @media (max-width: 768px) {
    width: 28vw;
    height: 40vw;
  }
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
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 1);
    transform: translateX(-50%) scale(1.1);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin: 1.8rem 0;
`;

const DateContainer = styled.div`
  color: #fff;
  font-weight: 500;
  margin-right: 1.7rem;
  @media (max-width: 1024px) {
  }

  @media (max-width: 1024px) {
    font-size: 0.9srem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const WeatherIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

const DateAndWeatherContainer = styled.div`
  display: flex;
  margin-top: -1vh;
  width: 150px;
  height: 40px;
  @media (max-width: 1024px) {
    margin-left: 0.5rem;
  }

  @media (max-width: 768px) {
    margin-top: -1rem;
    margin-left: 0.5rem;
  }
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
  @media (max-width: 1024px) {
    left: 10svw;
  }

  @media (max-width: 768px) {
    left: 1vw;
  }
`;

const NextButton = styled(PaginationButton)`
  right: 12vw;

  @media (max-width: 1024px) {
    right: 10svw;
  }

  @media (max-width: 768px) {
    right: 1vw;
  }
`;
