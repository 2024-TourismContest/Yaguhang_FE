import { useState } from "react";
import styled from "styled-components";
import { clubImg, teamToStadiumImg } from "../../assets/data/data";

export const Filter = ({
  hadleSpotChange,
  selectedSpot,
}: {
  hadleSpotChange: (spot: string) => void;
  selectedSpot: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const onClickLogo = (name: string) => {
    hadleSpotChange(name);
    setIsOpened(false);
  };
  const handleButton = () => {
    setIsOpened((prev) => !prev);
  };
  const teamLogo = teamToStadiumImg[selectedSpot];

  return (
    <div>
      <Button onClick={handleButton}>
        {teamLogo ? (
          <div>
            <img src={teamLogo} alt={selectedSpot} width={50} height={50} />
          </div>
        ) : (
          <p>
            구장 <br /> 선택
          </p>
        )}
      </Button>
      <Dialog open={isOpened}>
        <Ul>
          {Object.entries(clubImg).map(([key, { name, teamLogos }]) => (
            <li key={key} onClick={() => onClickLogo(name)}>
              <Round>
                <img src={teamLogos} alt={name} width={50} height={50} />
              </Round>
              <span>{name}</span>
            </li>
          ))}
        </Ul>
      </Dialog>
    </div>
  );
};

const Dialog = styled.dialog`
  z-index: 10;
  background-color: black;
  height: 350px;
`;
const Round = styled.div`
  border-radius: 50%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 70%;
    aspect-ratio: 1/1;
  }
`;
const Ul = styled.ul`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    color: white;
  }
`;
const Button = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  padding: 10%;
  border: 1px solid white;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    background-color: #ffffff;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 90%;
      height: 90%;
    }
  }
  p {
    color: white;
  }
`;
