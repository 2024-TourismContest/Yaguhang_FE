// import React from "react";
// import styled from "styled-components";
// import DOOSAN from "https://yaguhang.kro.kr:8443/teamLogos/Doosan.png";
// import HANWHA from "https://yaguhang.kro.kr:8443/teamLogos/Hanwha.png";
// import KIWOOM from "https://yaguhang.kro.kr:8443/teamLogos/Kiwoom.png";
// import KN from "https://yaguhang.kro.kr:8443/teamLogos/KIA.png";
// import KT from "https://yaguhang.kro.kr:8443/teamLogos/KtWizs.png";
// import LG from "https://yaguhang.kro.kr:8443/teamLogos/LGTwins.png";
// import LOTTE from "https://yaguhang.kro.kr:8443/teamLogos/Lotte.png";
// import NC from "https://yaguhang.kro.kr:8443/teamLogos/NCDinos.png";
// import SAMSUNG from "https://yaguhang.kro.kr:8443/teamLogos/Samsung.png";
// import SSG from "https://yaguhang.kro.kr:8443/teamLogos/SSGLanders.png";
// import ball from "../../assets/icons/ball.svg";
// import checkedball from "../../assets/icons/checkedball.svg";

// const teamlogos: { [key: string]: string } = {
//   두산: DOOSAN,
//   한화: HANWHA,
//   키움: KIWOOM,
//   NC: NC,
//   KT: KT,
//   LG: LG,
//   롯데: LOTTE,
//   삼성: SAMSUNG,
//   SSG: SSG,
// };

// interface Schedule {
//   id: number;
//   home: string;
//   away: string;
//   stadium: string;
//   date: string;
//   time: string;
//   weather: string;
//   isScraped: boolean;
// }

// const schedules: Schedule[] = [
//   {
//     id: 1,
//     home: "롯데",
//     away: "두산",
//     stadium: "사직",
//     date: "2024-07-18-화요일",
//     time: "18:30",
//     weather: "맑음",
//     isScraped: false,
//   },
//   {
//     id: 2,
//     home: "롯데",
//     away: "LG",
//     stadium: "사직",
//     date: "2024-07-19-수요일",
//     time: "18:30",
//     weather: "흐림",
//     isScraped: true,
//   },
//   {
//     id: 3,
//     home: "롯데",
//     away: "LG",
//     stadium: "사직",
//     date: "2024-07-19-수요일",
//     time: "18:30",
//     weather: "흐림",
//     isScraped: true,
//   },
//   {
//     id: 4,
//     home: "롯데",
//     away: "LG",
//     stadium: "사직",
//     date: "2024-07-19-수요일",
//     time: "18:30",
//     weather: "흐림",
//     isScraped: false,
//   },
//   {
//     id: 5,
//     home: "롯데",
//     away: "LG",
//     stadium: "사직",
//     date: "2024-07-19-수요일",
//     time: "18:30",
//     weather: "흐림",
//     isScraped: true,
//   },
//   {
//     id: 6,
//     home: "롯데",
//     away: "LG",
//     stadium: "사직",
//     date: "2024-07-19-수요일",
//     time: "18:30",
//     weather: "흐림",
//     isScraped: true,
//   },
// ];

// interface StyledCardProps {
//   isScraped: boolean;
// }

// const CardContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #000;
//   overflow-x: auto;
// `;

// const StyledCard = styled.div<StyledCardProps>`
//   position: relative;
//   width: 13vw;
//   max-width: 13rem;
//   height: 16vw;
//   max-height: 16rem;
//   background-color: #4a4a4a;
//   border-radius: 1.25rem;
//   box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
//   color: white;
//   text-align: center;
//   padding: 1rem;
//   margin: 1rem;
//   &::before {
//     content: "";
//     position: absolute;
//     top: -2rem;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 3rem;
//     height: 3rem;
//     background-color: #fff;
//     border-radius: 50%;
//     box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
//     background-image: url(${(props) => (props.isScraped ? checkedball : ball)});
//     background-size: cover;
//   }
// `;

// const Divider = styled.div`
//   width: 100%;
//   height: 1px;
//   background-color: #bbb;
//   margin: 1rem 0;
// `;

// const Card: React.FC = () => {
//   return (
//     <CardContainer>
//       {schedules.map((schedule) => (
//         <StyledCard key={schedule.id} isScraped={schedule.isScraped}>
//           <div style={{ marginTop: "3rem" }}>
//             <div>
//               {schedule.stadium} | {schedule.time}
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 margin: "1rem 0",
//               }}
//             >
//               <img
//                 src={teamlogos[schedule.home]}
//                 alt={`${schedule.home} 로고`}
//                 style={{ width: "3rem", height: "3rem" }}
//               />
//               <span style={{ margin: "0 1rem" }}>VS</span>
//               <img
//                 src={teamlogos[schedule.away]}
//                 alt={`${schedule.away} 로고`}
//                 style={{ width: "3rem", height: "3rem" }}
//               />
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-around" }}>
//               <span>{schedule.home}</span>
//               <span>{schedule.away}</span>
//             </div>
//             <Divider />
//             <div>{schedule.date}</div>
//           </div>
//         </StyledCard>
//       ))}
//     </CardContainer>
//   );
// };

// export default Card;
import React, { useState } from "react";
import styled from "styled-components";
import ball from "../../assets/icons/ball.svg";
import checkedball from "../../assets/icons/checkedball.svg";

const teamlogos: Record<string, string> = {
  두산: "https://yaguhang.kro.kr:8443/teamLogos/Doosan.png",
  한화: "https://yaguhang.kro.kr:8443/teamLogos/Hanwha.png",
  키움: "https://yaguhang.kro.kr:8443/teamLogos/Kiwoom.png",
  NC: "https://yaguhang.kro.kr:8443/teamLogos/NCDinos.png",
  KT: "https://yaguhang.kro.kr:8443/teamLogos/KtWizs.png",
  LG: "https://yaguhang.kro.kr:8443/teamLogos/LGTwins.png",
  롯데: "https://yaguhang.kro.kr:8443/teamLogos/Lotte.png",
  삼성: "https://yaguhang.kro.kr:8443/teamLogos/Samsung.png",
  SSG: "https://yaguhang.kro.kr:8443/teamLogos/SSGLanders.png",
};

interface Schedule {
  id: number;
  home: string;
  away: string;
  stadium: string;
  date: string;
  time: string;
  weather: string;
  isScraped: boolean;
}

const schedules: Schedule[] = [
  {
    id: 1,
    home: "롯데",
    away: "두산",
    stadium: "사직",
    date: "2024-07-18-화요일",
    time: "18:30",
    weather: "맑음",
    isScraped: false,
  },
  {
    id: 2,
    home: "롯데",
    away: "LG",
    stadium: "사직",
    date: "2024-07-19-수요일",
    time: "18:30",
    weather: "흐림",
    isScraped: true,
  },
  {
    id: 3,
    home: "롯데",
    away: "LG",
    stadium: "사직",
    date: "2024-07-19-수요일",
    time: "18:30",
    weather: "흐림",
    isScraped: true,
  },
  {
    id: 4,
    home: "롯데",
    away: "LG",
    stadium: "사직",
    date: "2024-07-19-수요일",
    time: "18:30",
    weather: "흐림",
    isScraped: false,
  },
  {
    id: 5,
    home: "롯데",
    away: "삼성",
    stadium: "사직",
    date: "2024-07-19-수요일",
    time: "18:30",
    weather: "흐림",
    isScraped: true,
  },
];

interface StyledCardProps {
  isScraped: boolean;
}

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  overflow-x: auto;
`;

const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  width: 13vw;
  max-width: 13rem;
  height: 16vw;
  max-height: 16rem;
  background-color: #4a4a4a;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid #ffffff;
  // clip-path: path(
  //   "M0,0 H100 V100 H0 Z M50,0 A10,10 0 0,1 60,10 A10,10 0 0,1 50,20 A10,10 0 0,1 40,10 A10,10 0 0,1 50,0"
  // );
  &::before {
    content: "";
    position: absolute;
    top: -2.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4rem;
    height: 4rem;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    background-image: url(${(props) => (props.isScraped ? checkedball : ball)});
    background-size: cover;
    z-index: 99;
  }

  &:after {
    content: "";
    position: absolute;
    top: -0.08rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4.1rem;
    height: 2rem;
    background-color: #000;
    border-radius: 0 0 2rem 2rem;
    border: 1px solid #fff;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin: 1.8rem 0;
`;

const DateContainer = styled.div`
  position: absolute;
  bottom: 1.3rem;
  left: 1rem;
  color: #fff;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4a4a4a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #6a6a6a;
  }
`;

const Card: React.FC = () => {
  const [filteredSchedules, setFilteredSchedules] =
    useState<Schedule[]>(schedules);

  const filterSchedules = (team: string) => {
    if (team === "전체") {
      setFilteredSchedules(
        schedules.filter((schedule) => schedule.date === "2024-07-18-화요일")
      ); // 오늘 날짜로 필터링
    } else {
      setFilteredSchedules(
        schedules
          .filter(
            (schedule) => schedule.home === team || schedule.away === team
          )
          .slice(0, 5)
      ); // 팀 이름으로 필터링하고 5개의 일정만 표시
    }
  };

  return (
    <>
      <ButtonContainer>
        {[
          "전체",
          "두산",
          "한화",
          "키움",
          "NC",
          "KT",
          "LG",
          "롯데",
          "삼성",
          "SSG",
        ].map((team) => (
          <Button key={team} onClick={() => filterSchedules(team)}>
            {team}
          </Button>
        ))}
      </ButtonContainer>
      <CardContainer>
        {filteredSchedules.map((schedule) => (
          <StyledCard key={schedule.id} isScraped={schedule.isScraped}>
            <div style={{ marginTop: "3rem" }}>
              <div>
                {schedule.stadium} | {schedule.time}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "1rem 0",
                }}
              >
                <img
                  src={teamlogos[schedule.home]}
                  alt={`${schedule.home} 로고`}
                  style={{ width: "3.5rem", height: "3rem" }}
                />
                <span style={{ margin: "0 1rem" }}>VS</span>
                <img
                  src={teamlogos[schedule.away]}
                  alt={`${schedule.away} 로고`}
                  style={{ width: "3.5rem", height: "3rem" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <span>{schedule.home}</span>
                <span>{schedule.away}</span>
              </div>
              <Divider />
              <DateContainer>{schedule.date}</DateContainer>
            </div>
          </StyledCard>
        ))}
      </CardContainer>
    </>
  );
};

export default Card;
