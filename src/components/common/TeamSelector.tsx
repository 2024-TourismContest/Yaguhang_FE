import styled from "styled-components";

interface TeamSelectorProps {
  filterSchedules: (team: string) => void;
  teamLogos: Record<string, string>;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  showAllButton?: boolean;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  filterSchedules,
  teamLogos,
  selectedTeam,
  setSelectedTeam,
  showAllButton = true,
}) => {
  const handleButtonClick = (team: string) => {
    setSelectedTeam(team);
    filterSchedules(team);
  };

  return (
    <ButtonContainer>
      {showAllButton && (
        <TextButton
          onClick={() => handleButtonClick("전체")}
          selected={selectedTeam === "전체"}
          teamName="전체"
        >
          전체
        </TextButton>
      )}
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

export default TeamSelector;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 50px;
  width: 100%;
`;

const IconButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
  overflow-x: auto;
  height: auto;
  border: 1px solid #fff;
  border-radius: 50px;
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
  background-color: ${(props) => (props.selected ? "#fff" : "#000")};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;
  margin: 0.5rem;
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
