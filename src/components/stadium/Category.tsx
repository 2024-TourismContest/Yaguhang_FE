import { useEffect } from "react";
import styled from "styled-components";
import useTeamStore from "../../store/TeamStore";

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
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: auto;
  width: 60vw;
  border: 1px solid #fff;
  border-radius: 50px;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button<{ selected?: boolean; teamName: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0 0.7rem;
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

interface CategoryProps {
  filterSchedules: (team: string) => void;
  teamLogos: Record<string, string>;
}

const Category: React.FC<CategoryProps> = ({ filterSchedules, teamLogos }) => {
  const { selectedTeam, setSelectedTeam } = useTeamStore();

  const handleButtonClick = (team: string) => {
    setSelectedTeam(team);
    filterSchedules(team);
  };
  console.log(selectedTeam);
  useEffect(() => {
    // 페이지 첫 로드 시 teamLogos의 첫 번째 팀을 기본 선택할 수 있습니다.
    if (!selectedTeam && Object.keys(teamLogos).length > 0) {
      const firstTeam = Object.keys(teamLogos)[0];
      setSelectedTeam(firstTeam);
      filterSchedules(firstTeam);
    }
  }, [selectedTeam, setSelectedTeam, filterSchedules, teamLogos]);

  return (
    <ButtonContainer>
      <IconButton>
        {Object.keys(teamLogos).map((team) => (
          <Button
            key={team}
            onClick={() => handleButtonClick(team)}
            selected={selectedTeam === team}
            teamName={team}>
            <img src={teamLogos[team]} alt={`${team} 로고`} />
            <div className="team-name">{team}</div>
          </Button>
        ))}
      </IconButton>
    </ButtonContainer>
  );
};

export default Category;
