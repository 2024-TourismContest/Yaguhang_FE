import styled from "styled-components";
import { useTeamStore } from "../../store/TeamStore";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 10vh;
  padding: 1rem;
  border-radius: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 5vh;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    margin-top: 3vh;
    padding: 0.3rem;
  }
`;

const IconButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  width: 56vw;
  height: auto;
  border: 1px solid #fff;
  border-radius: 50px;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1024px) {
    width: 80vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 95vw;
    height: auto;
  }
`;

const Button = styled.button<{ selected?: boolean; teamName: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0.5rem;
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

    @media (max-width: 768px) {
      width: 3rem;
      height: 2.5rem;
    }

    @media (max-width: 480px) {
      width: 2.5rem;
      height: 2rem;
    }
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

    @media (max-width: 768px) {
      font-size: 0.7rem;
      padding: 0.15rem 0;
    }

    @media (max-width: 480px) {
      font-size: 0.6rem;
      padding: 0.1rem 0;
    }
  }
`;

const TextButton = styled(Button)`
  border: 1px solid #fff;
  font-size: 1rem;
  color: ${(props) => (props.selected ? "#000" : "#fff")};
  background-color: ${(props) => (props.selected ? "#fff" : "#000")};

  &:hover {
    color: ${(props) => (props.selected ? "#000" : "#ddd")};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 3.5rem;
    height: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    width: 3rem;
    height: 3rem;
  }
`;
