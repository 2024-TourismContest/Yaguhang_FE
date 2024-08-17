import React, { useState } from "react";
import styled from "styled-components";
import { BsBookmarkStar } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import defaultImg from "../../assets/icons/logo_gray.svg";
import { useNavigate } from "react-router-dom";
import { home } from "../../apis/main";

interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped?: boolean;
  picker?: string;
}

interface ImageSliderProps {
  spots: SpotBasicPreviewDto[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ spots }) => {
  const [markedSpots, setMarkedSpots] = useState<{ [key: number]: boolean }>(
    {}
  );
  const navigate = useNavigate();

  const onClickMark = async (contentId: number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // 토큰이 없으면 로그인 화면으로 이동
      navigate("/login");
      alert("로그인이 필요합니다");
      return;
    }
    const stadiumId = "5"; // 수정 필요

    try {
      // 북마크 요청 보내기
      await home.bookmark(contentId.toString(), stadiumId);
      // 상태 업데이트
      setMarkedSpots((prev) => ({
        ...prev,
        [contentId]: !prev[contentId],
      }));
    } catch (error) {
      console.error("북마크 상태 변경 오류:", error);
    }
  };
  console.log("이미지슬라이더", spots);

  if (!spots || spots.length === 0) return <div>No data available</div>;

  return (
    <Container>
      <ImageWrapper>
        {spots.map((spot) => (
          <SlideContainer key={spot.contentId}>
            <StyledMark pick={spot.picker || "none"}>
              {spot.picker ? spot.picker : ""}
            </StyledMark>
            {spot.imageUrl ? (
              <SlideImage src={spot.imageUrl} alt={spot.name} />
            ) : (
              <DefaultImage src={defaultImg} alt={spot.name} />
            )}
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgba(236, 234, 234, 0.3);
  border-radius: 0.9vw;
  filter: drop-shadow(0px 3.101px 3.101px rgba(0, 0, 0, 0.25));
`;

const SlideImage = styled.img`
  width: 100%;
  height: clamp(150px, 14.99vw, 370px);
  object-fit: cover;
  border-radius: 0.9vw;
`;

const DefaultImage = styled.img`
  width: 85%;
  object-fit: cover;
  border-radius: 0.9vw;
`;
const StyledMark = styled.div<{ pick: string }>`
  z-index: 5;
  position: absolute;
  width: 50%;
  top: 0;
  right: 10%;
  height: 12%;
  background: #000000;
  color: white;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  font-size: 0.85em;
  display: grid;
  place-items: center;
  visibility: ${(props) => (props.pick === "none" ? "hidden" : "visible")};
  font-weight: 600;
`;

const SlideInfo = styled.div`
  z-index: 5;
  position: absolute;
  width: 100%;
  bottom: 0;
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
  gap: 1.2vw;
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
