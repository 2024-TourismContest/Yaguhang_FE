import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useStore from "../../store/PreferTeamStore";
import { mypage } from "../../apis/mypage";
import useModalStore from "../../store/modalStore";
import useBalloonStore from "../../store/ballonStore";

interface TeamSelectorProps {
  teamLogos: Record<string, string>;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  showAllButton?: boolean;
  isEnabled?: boolean;
  setIsEnabled?: (enabled: boolean) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  teamLogos,
  selectedTeam,
  setSelectedTeam,
  showAllButton = true,
  isEnabled = true,
  setIsEnabled,
}) => {
  const { setPreferTeam } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModalStore();
  const { setShowBalloon } = useBalloonStore();
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수 상태 추가

  // 외부 클릭 시 비활성화
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (setIsEnabled) {
          setIsEnabled(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsEnabled]);

  const handleButtonClick = useCallback(
    (team: string) => {
      if (!isEnabled) {
        setClickCount((prev) => prev + 1);
        if (clickCount + 1 >= 2) {
          setShowBalloon(true);
          setClickCount(0);
        }
        return;
      }
      openModal({
        title: "선호 팀 변경",
        content: `"${team}" 팀으로 변경하시겠습니까?`,
        onConfirm: async () => {
          if (team) {
            try {
              const res = await mypage.RegistFan(team);
              console.log(res);
              setSelectedTeam(team);
              setPreferTeam(team);
            } catch (error) {
              console.error("Error during team selection:", error);
            }
          }
          closeModal();
        },
        showCancel: true,
      });
    },
    [isEnabled, clickCount, setSelectedTeam, setPreferTeam, openModal]
  );

  return (
    <div ref={containerRef}>
      <ButtonContainer isEnabled={isEnabled}>
        {showAllButton && (
          <TextButton
            onClick={() => handleButtonClick("전체")}
            selected={selectedTeam === "전체"}
            teamName="전체"
            isEnabled={isEnabled}
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
              isEnabled={isEnabled}
            >
              <img src={teamLogos[team]} alt={`${team} 로고`} />
              <div className="team-name">{team}</div>
            </Button>
          ))}
        </IconButton>
      </ButtonContainer>
    </div>
  );
};

export default TeamSelector;

const ButtonContainer = styled.div<{ isEnabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 50px;
  border: ${({ isEnabled }) =>
    isEnabled ? "2px solid #fff" : "1px solid #fff"};
  background: ${({ isEnabled }) => (isEnabled ? "#ffffff30" : "none")};
  transition: border 0.2s ease-out;
`;

const IconButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
  overflow-x: auto;
  height: auto;
  border-radius: 50px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button<{
  selected?: boolean;
  teamName: string;
  isEnabled?: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background: ${(props) => (props.selected ? "#fff" : "none")};
  border: none;
  border-radius: 50%;
  transition: background 0.3s;
  overflow: hidden;
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.isEnabled ? (props.selected ? "#fff" : "#ffffff30") : "none"};
  }

  &:hover .team-name {
    opacity: ${(props) => (props.isEnabled ? 1 : 0)};
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

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;

    img {
      width: 3rem;
      height: 2.5rem;
    }

    .team-name {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;

    img {
      width: 2.5rem;
      height: 2rem;
    }

    .team-name {
      font-size: 0.6rem;
    }
  }
`;

const TextButton = styled(Button)`
  border: 1px solid #fff;
  font-size: 1rem;
  color: ${(props) => (props.selected ? "#000" : "#fff")};

  &:hover {
    color: ${(props) => (props.selected ? "#000" : "#ddd")};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
