import { useState } from "react";
import styled from "styled-components";

const teamLogos: Record<string, string> = {
  LG: "https://yaguhang.kro.kr:8443/teamLogos/LGTwins.png",
  KT: "https://yaguhang.kro.kr:8443/teamLogos/KtWizs.png",
  SSG: "https://yaguhang.kro.kr:8443/teamLogos/SSGLanders.png",
  NC: "https://yaguhang.kro.kr:8443/teamLogos/NCDinos.png",
  두산: "https://yaguhang.kro.kr:8443/teamLogos/Doosan.png",
  KIA: "https://yaguhang.kro.kr:8443/teamLogos/KIA.png",
  롯데: "https://yaguhang.kro.kr:8443/teamLogos/Lotte.png",
  삼성: "https://yaguhang.kro.kr:8443/teamLogos/Samsung.png",
  한화: "https://yaguhang.kro.kr:8443/teamLogos/Hanwha.png",
  키움: "https://yaguhang.kro.kr:8443/teamLogos/Kiwoom.png",
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 10vh;
  padding: 1rem;
  border-radius: 50px;
`;

const IconButton = styled.div`
  space-between: center;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: auto;
  width: 60vw;
  height: 4rem;
  border: 1px solid #fff;
  border-radius: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button<{ selected?: boolean; teamName: string }>`
  position: relative;
  display: flex;
  space-between: center;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0 0.9rem;
  background-color: ${(props) => (props.selected ? "#fff" : "#000")};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;

  &:hover .team-name {
    opacity: 1;
  }

  &:hover {
    background-color: ${(props) => (props.selected ? "#fff" : "#333")};
  }
  img {
    width: 4rem;
    height: 3rem;
  }

  .team-name {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    text-align: center;
    padding: 0.2rem 0;
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

const TextButton = styled(Button)`
  border: 1px solid #fff;
  font-size: 1rem;
  color: ${(props) => (props.selected ? "#000" : "#fff")};
  &:hover {
    color: ${(props) => (props.selected ? "#000" : "#ddd")};
  }
`;
interface CategoryProps {
  filterSchedules: (team: string) => void;
  teamLogos: Record<string, string>;
}

const Category: React.FC<CategoryProps> = ({ filterSchedules, teamLogos }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("전체");

  const handleButtonClick = (team: string) => {
    setSelectedTeam(team);
    filterSchedules(team);
  };

  return (
    <ButtonContainer>
      <TextButton
        onClick={() => handleButtonClick("전체")}
        selected={selectedTeam === "전체"}
        teamName="전체"
      >
        전체
      </TextButton>
      <IconButton>
        {Object.keys(teamLogos).map((team) => (
          <Button
            key={team}
            onClick={() => handleButtonClick(team)}
            selected={selectedTeam === team}
            teamName={team}
          >
            <img src={teamLogos[team]} alt={`${team} 로고`} />
            <div className="team-name">{team}</div>
          </Button>
        ))}
      </IconButton>
    </ButtonContainer>
  );
};

export default Category;
