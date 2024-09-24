import { useState } from "react";
import styled from "styled-components";
import { clubImg, teamToStadiumImg } from "../../assets/data/data";
import XCircle from "../../assets/icons/XCircle";
import all from "../../assets/images/filterAll.svg";

export const Filter = ({
  handleSpotChange,
  selectedSpot,
}: {
  handleSpotChange: (spot: string) => void;
  selectedSpot: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const onClickLogo = (name: string) => {
    handleSpotChange(name);
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
            <img src={teamLogo} alt={selectedSpot} width={60} height={60} />
          </div>
        ) : (
          <p>
            구장 <br /> 선택
          </p>
        )}
      </Button>
      <Dialog open={isOpened}>
        <Title>
          <p>구장선택</p>
          <button onClick={handleButton}>
            <XCircle />
          </button>
        </Title>
        <Ul>
          {Object.entries(clubImg).map(([key, { name, teamLogos }]) => (
            <li key={key} onClick={() => onClickLogo(name)}>
              {teamLogos ? (
                <Round>
                  <img src={teamLogos} alt={name} width={50} height={50} />
                </Round>
              ) : (
                <DefaultRound>
                  <img src={all} alt={name} width={50} height={50} />
                </DefaultRound>
              )}
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
  background-color: #2e2e2e;
  height: 410px;
  aspect-ratio: 1.8/3;
  border-radius: 2rem;
  inset-inline-start: -400px;
  @media (max-width: 1024px) {
    inset-inline-start: -0px;
  }
`;
const Round = styled.div`
  border-radius: 50%;
  aspect-ratio: 1/1;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 5px;
  img {
    width: 56.25px;
  }
`;
const DefaultRound = styled.div`
  border-radius: 50%;
  height: 100%;
  aspect-ratio: 1/1;

  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  img {
    width: 90%;
    aspect-ratio: 1/1;
  }
`;
const Ul = styled.ul`
  height: 90%;
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
  width: 75px;
  height: 75px;
  border-radius: 50%;
  padding: 10%;
  border: 1px solid white;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  transition: all 0.3s ease;

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

  &:hover {
    background-color: #fff;
    transform: scale(1.1);
    cursor: pointer;

    p {
      color: #686868;
    }
  }

  @media (max-width: 1024px) {
    width: 50px;
    height: 50px;
  }

  &:hover {
    border: blue;
  }
`;

const Title = styled.div`
  display: flex;
  border-bottom: 1px solid white;
  justify-content: space-around;
  gap: 50%;
  color: white;
  margin-bottom: 10px;

  button {
    background-color: transparent;
    box-shadow: none;
    border: none;
  }
`;
