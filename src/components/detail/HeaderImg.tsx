import React from "react";
import styled from "styled-components";
import Detailnull from "../../assets/images/Detailnull.svg";

interface HeaderProps {
  imageUrl: string | undefined;
  title: string | undefined;
  description: string | undefined;
}

const HeaderImg: React.FC<HeaderProps> = ({ imageUrl, title, description }) => {
  // 기본 이미지 URL
  const defaultImageUrl = Detailnull;

  return (
    <HeaderContainer backgroundImage={imageUrl || defaultImageUrl}>
      <HeaderText>
        <h1>{title}</h1>
        <p>{description}</p>
      </HeaderText>
    </HeaderContainer>
  );
};

export default HeaderImg;

const HeaderContainer = styled.div<{ backgroundImage: string }>`
  position: relative;
  height: 56.8125rem;
  background: url(${(props) => props.backgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
  @media (max-width: 1024px) {
    height: 70vh;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }

  @media (max-width: 480px) {
    height: 60vh;
    background-size: contain;
  }
`;

const HeaderText = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-bottom: 10vh;
  text-align: center;
  color: #ffffff;
  max-width: 80%;
  h1 {
    font-weight: 500;
    margin: 0;
    font-size: 2.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

    @media (max-width: 1024px) {
      font-size: 2em;
    }

    @media (max-width: 768px) {
      font-size: 1.5em;
    }

    @media (max-width: 480px) {
      font-size: 1.2em;
    }
  }

  p {
    padding: 10px;
    font-size: 1.25rem;
    margin-top: 10px;
    line-height: 1.5;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1024px) {
      max-width: 500px;
      font-size: 1.1em;
    }
    @media (max-width: 768px) {
      font-size: 1em;
      max-width: 90%;
    }

    @media (max-width: 480px) {
      font-size: 0.9em;
      max-width: 80%;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 20vh;
  }

  @media (max-width: 480px) {
    margin-bottom: 15vh;
  }
`;
