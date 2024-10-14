import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, Space } from "antd";
import moment, { Moment } from "moment";
import styled, { keyframes } from "styled-components";
import { fetchSchedules, scrapSchedule } from "../../apis/main";
import ball from "../../assets/icons/ball.svg";
import checkedball from "../../assets/icons/checkedball.svg";
import { GiBaseballBat } from "react-icons/gi";
import { IoBaseballOutline } from "react-icons/io5";
import left from "../../assets/icons/left.png";
import right from "../../assets/icons/right.png";
import useTeamStore from "../../store/TeamStore";
import * as S from "../../styles/common/TitleSection";
import { teamLogos } from "../../types/teamLogos";
import Category from "./Category";
import useModalStore from "../../store/modalStore";

const { RangePicker } = DatePicker;

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
  $isHighlighted?: boolean;
}

const Card: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [schedulesPerPage, setSchedulesPerPage] = useState(5);
  const { selectedTeam, setSelectedGame, selectedGame } = useTeamStore();
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Moment, Moment] | null
  >(null);
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const updateSchedulesPerPage = () => {
    if (window.innerWidth <= 768) {
      setSchedulesPerPage(2);
    } else if (window.innerWidth <= 1024) {
      setSchedulesPerPage(3);
    } else {
      setSchedulesPerPage(4);
    }
  };

  useEffect(() => {
    const loadSchedules = async () => {
      const schedules = await fetchSchedules(selectedTeam);
      setSchedules(schedules);
      setCurrentPage(0);
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
    updateSchedulesPerPage();
    window.addEventListener("resize", updateSchedulesPerPage);
    return () => window.removeEventListener("resize", updateSchedulesPerPage);
  }, []);

  const indexOfLastSchedule = (currentPage + 1) * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;

  const filteredSchedules = selectedDateRange
    ? schedules.filter((schedule) => {
        const scheduleDate = moment(schedule.date);
        return (
          scheduleDate >= selectedDateRange[0] &&
          scheduleDate <= selectedDateRange[1]
        );
      })
    : schedules;

  const currentSchedules = filteredSchedules.slice(
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
      openModal({
        title: "로그인 필요",
        content: "경기를 스크랩하기 위해 로그인이 필요합니다.",
        onConfirm: () => {
          navigate("/login");
          closeModal();
        },
        onCancel: () => {
          closeModal();
        },
        showCancel: true,
      });
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

      const selectedSchedule = schedules.find((s) => s.id === gameId);
      if (selectedSchedule) {
        setSelectedGame({
          id: selectedSchedule.id,
          date: selectedSchedule.date,
          stadium: selectedSchedule.stadium,
        });
      }

      toast.success(
        isScraped ? (
          <ToastMessage>
            <p>스크랩에 추가되었습니다.</p>
            <p>경기 전날 이메일 알림을 보내드려요!</p>
          </ToastMessage>
        ) : (
          "스크랩에서 제거되었습니다."
        )
      );
    } catch (error) {
      if (token) {
        toast.error("스크랩 중 오류가 발생했습니다.");
      }
    }
  };

  const handleCardClick = (schedule: Schedule) => {
    setSelectedGame({
      id: schedule.id,
      date: schedule.date,
      stadium: schedule.stadium,
    });
  };

  const handleDateChange = (dates: any) => {
    setSelectedDateRange(dates as [Moment, Moment] | null);
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
          <StyledSpace direction="vertical" size={12}>
            <StyledRangePicker
              onChange={handleDateChange}
              placeholder={["시작 날짜", "종료 날짜"]}
              style={{ color: "#fff" }}
            />
          </StyledSpace>
        </S.TitleWrapper>
      </S.Wrapper>
      <CardContainer>
        <PrevButton onClick={prevPage} disabled={currentPage === 0}>
          <img src={left} alt="이전" />
        </PrevButton>

        {/* 경기 일정이 없을 경우 표시 */}
        {currentSchedules.length === 0 ? (
          <NoScheduleContainer>
            <SpinningBall />
            <SwingingBat />
            <NoScheduleText>
              지금은 경기가 없어요. 다음 경기 일정을 기다려주세요!
            </NoScheduleText>
          </NoScheduleContainer>
        ) : (
          currentSchedules.map((schedule) => (
            <StyledCard
              key={schedule.id}
              $isScraped={schedule.isScraped}
              $isHighlighted={selectedGame?.id === schedule.id}
              onClick={() => handleCardClick(schedule)}
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
                    style={{ width: "3.5rem", height: "2.5rem" }}
                  />
                  <span style={{ margin: "0 1rem" }}>VS</span>
                  <img
                    src={schedule.awayTeamLogo}
                    alt={`${schedule.away}`}
                    style={{ width: "3.5rem", height: "2.5rem" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "40px",
                    marginTop: "10px",
                    fontSize: "0.8rem",
                  }}
                >
                  <span style={{ whiteSpace: "pre-line" }}>
                    {schedule.home}
                  </span>
                  <span style={{ whiteSpace: "pre-line" }}>
                    {schedule.away}
                  </span>
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
          ))
        )}
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

const ToastMessage = styled.div`
  white-space: pre-line;
  font-size: 1rem;
  line-height: 1.5;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const swing = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-20deg); }
  100% { transform: rotate(0deg); }
`;

const SpinningBall = styled(IoBaseballOutline)`
  font-size: 3rem;
  animation: ${spin} 2s linear infinite;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SwingingBat = styled(GiBaseballBat)`
  font-size: 5rem;
  animation: ${swing} 1s ease-in-out infinite;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const NoScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  color: white;

  @media (max-width: 1024px) {
    width: 450px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 25vh;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 20vh;
  }
`;

const NoScheduleText = styled.p`
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #fff;
    text-align: center;
  white-space: pre-line;
  word-break: keep-all;
  margin: 0 auto;


  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const StyledSpace = styled(Space)`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;
const StyledRangePicker = styled(RangePicker)`
  width: 300px;
  border-radius: 8px;
  border-color: #ffffff;
  background-color: #000;

  .ant-picker-input > input {
    color: #fff;
    cursor: pointer;
  }
  .ant-picker-input > input::placeholder {
    color: #fff;
    padding-left: 10px;
  }

  .ant-picker-suffix {
    color: #fff;
    font-size: 20px;
  }

  .ant-picker-separator {
    color: #fff;
  }

  .ant-picker-input {
    background-color: #333;
    color: #fff;
    border-radius: 8px;
  }

  .ant-picker-clear {
    color: #fff;
  }
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  width: 170px;
  max-width: 11rem;
  height: 220px;
  max-height: 14rem;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid #ffffff;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #4e4e4e !important;
    transform: scale(1.05) !important;
  }

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    `
    border: 5px solid #ffffff;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.3);
  `}

  @media (max-width: 1024px) {
    width: 170px;
    height: 220px;
  }

  @media (max-width: 768px) {
    width: 170px;
    height: 210px;
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
  left: -1rem;
`;

const NextButton = styled(PaginationButton)`
  right: -1rem;
`;
