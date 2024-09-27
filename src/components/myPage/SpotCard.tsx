import React from "react";
import styled from "styled-components";
import BookmarkIcon from "../common/BookMarkIcon";
import { ScrapSpot } from "../../types/myPageType";

interface SpotCardProps {
  spot: ScrapSpot;
  defaultImg: string;
  handleClick: (spot: ScrapSpot) => void;
}

const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  defaultImg,
  handleClick,
}) => {
  return (
    <ContentWrapper onClick={() => handleClick(spot)}>
      <ImgWrapper>
        <Img src={spot.image || defaultImg} alt={spot.title} />
        <Gradient />
        <TitleWrapper>
          <Title>{spot.title}</Title>
          <BookmarkIcon
            stadiumId={spot.stadiumInfo.StadiumId}
            contentId={spot.contentId}
            isMarked={true}
            width="1.25rem"
          />
        </TitleWrapper>
      </ImgWrapper>
    </ContentWrapper>
  );
};

export default SpotCard;

const ContentWrapper = styled.div`
  /* max-width: 230px; */
  /* width: 230px; */
  min-width: calc((100% - 10px * (4 - 1)) / 4); /* 카드 너비 계산 */
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;

  @media (max-width: 1100px) {
    flex: 1 0 calc(33.33% - 10px);
  }

  @media (max-width: 800px) {
    flex: 1 0 calc(50% - 10px);
  }

  @media (max-width: 400px) {
    flex: 1 0 100%;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s ease-in-out;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  transition: 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.8));
    height: 100%;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 1rem;
  color: white;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
`;
