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
  category: string;
}

interface SimilarSpotsProps {
  similarSpots: SpotPreviewDto[];
  bookmarkStates: { [key: number]: boolean };
  handleBookmarkToggle: (contentId: number) => void;
  onClickContent: (category: string, contentId: number) => void;
  id?: string;
  name?: string;
}

const SimilarSpots: React.FC<SimilarSpotsProps> = ({
  similarSpots,
  bookmarkStates,
  handleBookmarkToggle,
  onClickContent,
  id,
  name,
}) => {
  return (
    <div id={id}>
      <Section>
        <h1>{`"${name}" 와(과) 비슷한 주변 추천✨`}</h1>
        <SimilarSpotsContainer>
          {similarSpots.map((spot) => (
            <CardContainer
              key={spot.contentId}
              onClick={() =>
                onClickContent(spot.category || "맛집", spot.contentId)
              }
            >
              <BookmarkIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkToggle(spot.contentId);
                }}
              >
                {bookmarkStates[spot.contentId] ? (
                  <BsBookmarkFill style={{ fontSize: "1.5rem" }} />
                ) : (
                  <BsBookmarkStar style={{ fontSize: "1.5rem" }} />
                )}
              </BookmarkIcon>
              {spot.imageUrl ? (
                <SpotImage src={spot.imageUrl} alt={spot.name} />
              ) : (
                <DefaultImage
                  src="https://yaguhang.kro.kr:8443/defaultLogos/defaultSmallImage.svg"
                  alt={spot.name}
                />
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
  text-align: center;
  margin-top: 5vh;
  justify-content: center;
  align-items: center;

  h1 {
    color: #ffffff;
    font-size: 1.6rem;
  }

  @media (max-width: 1024px) {
    padding: 0 5rem;
    h1 {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
    h1 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    h1 {
      font-size: 1.1rem;
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

  @media (max-width: 1024px) {
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const CardContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1024px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
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
  width: 45px;
  height: 55px;
  background-color: #1a278e;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  padding-bottom: 45px;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 1024px) {
    width: 35px;
    height: 45px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 40px;
    padding-left: 35px;
    padding-bottom: 35px;

    svg {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 35px;
    padding-left: 30px;
    padding-bottom: 30px;

    svg {
      font-size: 1rem;
    }
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

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    bottom: 35px;
  }

  @media (max-width: 768px) {
    width: 120px;
    font-size: 0.8rem;
    bottom: 30px;
  }

  @media (max-width: 480px) {
    width: 100px;
    font-size: 0.7rem;
    bottom: 25px;
  }
`;
