import React from "react";
import styled from "styled-components";
import { BsBookmarkFill, BsBookmarkStar } from "react-icons/bs";
import loadingImg from "../../assets/images/loadingImg.svg";

export interface SpotPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped: boolean;
  stadiumId: number;
}

interface SimilarSpotsProps {
  similarSpots: SpotPreviewDto[];
  bookmarkStates: { [key: number]: boolean };
  handleBookmarkToggle: (contentId: number) => void;
  onClickContent: (contentId: number) => void;
  id?: string;
}

const SimilarSpots: React.FC<SimilarSpotsProps> = ({
  similarSpots,
  bookmarkStates,
  handleBookmarkToggle,
  onClickContent,
  id,
}) => {
  return (
    <div id={id}>
      <Section>
        <h1>비슷한 관광지</h1>
        <SimilarSpotsContainer>
          {similarSpots.map((spot) => (
            <CardContainer
              key={spot.contentId}
              onClick={() => onClickContent(spot.contentId)}
            >
              <BookmarkIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkToggle(spot.contentId);
                }}
              >
                {bookmarkStates[spot.contentId] ? (
                  <BsBookmarkFill style={{ fontSize: "2rem" }} />
                ) : (
                  <BsBookmarkStar style={{ fontSize: "2rem" }} />
                )}
              </BookmarkIcon>
              {spot.imageUrl ? (
                <SpotImage src={spot.imageUrl} alt={spot.name} />
              ) : (
                <DefaultImage src={loadingImg} alt={spot.name} />
              )}
              <Overlay />
              <LocationText>{spot.name}</LocationText>
            </CardContainer>
          ))}
        </SimilarSpotsContainer>
      </Section>
    </div>
  );
};

export default SimilarSpots;

const Section = styled.div`
  position: relative;
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  flex-direction: row;
  text-align: center;
  margin-top: 8vh;

  h1 {
    color: #ffffff;
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
    h1 {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    h1 {
      font-size: 1.2rem;
    }
  }
`;

const SimilarSpotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  filter: drop-shadow(0px 3.101px 3.101px rgba(0, 0, 0, 0.25));

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const CardContainer = styled.div`
  width: 230px;
  height: 230px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  border-radius: 50%;
`;

const BookmarkIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 65px;
  background-color: #1a278e;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  padding-bottom: 45px;
  color: #fff;

  @media (max-width: 768px) {
    width: 50px;
    height: 55px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 45px;
  }
`;

const SpotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const LocationText = styled.p`
  width: 150px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  text-align: center;
  position: absolute;
  bottom: 40px;
  font-gradient: 2px;

  @media (max-width: 768px) {
    width: 130px;
    font-size: 0.9rem;
    bottom: 30px;
  }

  @media (max-width: 480px) {
    width: 110px;
    font-size: 0.8rem;
    bottom: 20px;
  }
`;
