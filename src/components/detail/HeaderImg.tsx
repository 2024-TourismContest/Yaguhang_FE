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
      rgba(255, 0, 0, 0) 0%,
      rgba(255, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 90%,
      rgb(0, 0, 0) 100%
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 40rem;
    background-size: cover;
  }

  @media (max-width: 480px) {
    height: 30rem;
    background-size: contain;
  }
`;

const HeaderText = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-top: 55vh;
  text-align: center;
  color: #ffffff;

  h1 {
    font-weight: 600;
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
      font-size: 1rem;
    }
  }

  p {
    max-width: 1000px;
    max-height: 50px;
    font-size: 25px;
    margin: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1024px) {
      max-width: 500px;
      max-height: 50px;
      font-size: 1.3em;
    }
    @media (max-width: 768px) {
      font-size: 16px;
      max-width: 500px;
      max-height: 50px;
      margin: 20px;
    }

    @media (max-width: 480px) {
      font-size: 1em;
      max-width: 300px;
      max-height: 50px;
      margin: 40px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 40vh;
  }

  @media (max-width: 480px) {
    margin-top: 35vh;
  }
`;
