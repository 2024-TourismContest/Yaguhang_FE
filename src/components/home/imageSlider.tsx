import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsBookmarkStar } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { home } from "../../apis/main/index";

interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
}

const ImageSlider: React.FC = () => {
  const [spots, setSpots] = useState<SpotBasicPreviewDto[]>([]);
  const [markedSpots, setMarkedSpots] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [placeData, setPlaceData] = useState(null);

  const stadium = "사직";
  const category = "숙소";
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await home.place(stadium, category);
        setPlaceData(response.data);
        // API 응답에서 spotPreviewDtos를 spots 상태로 설정
        setSpots(response.data.spotPreviewDtos || []);
      } catch (err) {
        console.error("카테고리별추천 에러:", err);
      }
    };

    fetchPlaceData();
  }, []);

  const onClickMark = (contentId: number) => {
    setMarkedSpots((prev) => ({
      ...prev,
      [contentId]: !prev[contentId],
    }));
  };

  if (!placeData) return <div>Loading...</div>;
  return (
    <Container>
      <ImageWrapper>
        {spots.map((spot) => (
          <SlideContainer key={spot.contentId}>
            <SlideImage src={spot.imageUrl} alt={spot.name} />
            <SlideInfo>
              <span>
                <SlideName>
                  {spot.name.length > 7
                    ? `${spot.name.slice(0, 7)}...`
                    : spot.name}
                </SlideName>
                <SlideAddress>
                  {spot.address.length > 10
                    ? `${spot.address.slice(0, 10)}...`
                    : spot.address}
                </SlideAddress>
              </span>
              {markedSpots[spot.contentId] ? (
                <LuDot onClick={() => onClickMark(spot.contentId)} />
              ) : (
                <BsBookmarkStar onClick={() => onClickMark(spot.contentId)} />
              )}
            </SlideInfo>
          </SlideContainer>
        ))}
      </ImageWrapper>
    </Container>
  );
};

export default ImageSlider;

const SlideContainer = styled.div`
  width: clamp(130px, 11.6vw, 370px);
  height: clamp(150px, 14.99vw, 370px);
  overflow: hidden;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SlideImage = styled.img`
  width: clamp(130px, 11.6vw, 370px);
  height: clamp(150px, 14.99vw, 370px);
  object-fit: cover;
  border-radius: 10px;
`;

const SlideInfo = styled.div`
  z-index: 5;
  position: absolute;
  width: clamp(130px, 11.6vw, 370px);
  bottom: 0;
  left: 5px;
  right: 0;
  height: 43%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
  color: white;
  text-align: justify;
  display: flex;
  align-items: end;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;

  svg {
    position: absolute;
    right: 10px;
    width: 25x;
    height: 25px;
    @media screen and (max-width: 1128px) {
      top: 0px;
    }
  }
`;

const SlideName = styled.h3`
  margin: 0;
  font-size: clamp(10px, 0.88em, 370px);
`;

const SlideAddress = styled.p`
  margin: 5px 0 0;
  font-size: clamp(6px, 0.7em, 370px);
  @media screen and (max-width: 1128px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  width: clamp(540px, 49.02vw, 750px);
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1400px;
  padding: 15px clamp(20px, 28.68vw, 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5vw;
`;
