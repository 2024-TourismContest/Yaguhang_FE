import React from "react";
import styled from "styled-components";
import { BsBookmarkFill, BsBookmarkStar } from "react-icons/bs";
import loading from "../../assets/images/loading.svg";

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
}

const SimilarSpots: React.FC<SimilarSpotsProps> = ({
  similarSpots,
  bookmarkStates,
  handleBookmarkToggle,
  onClickContent,
}) => {
  return (
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
              <DefaultImage src={loading} alt={spot.name} />
            )}
            <LocationText>{spot.name}</LocationText>
          </CardContainer>
        ))}
      </SimilarSpotsContainer>
    </Section>
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
`;

const SimilarSpotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const CardContainer = styled.div`
  width: 260px;
  height: 260px;
  background-color: #ccc;
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
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const BookmarkIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px; /* 아이콘 크기 조정 */
  height: 65px;
  background-color: #1a278e;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  padding-bottom: 45px;
  color: #fff;
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
`;
