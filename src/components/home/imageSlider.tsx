import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import festival from "../../assets/icons/festival.svg";
import place from "../../assets/icons/place.svg";
import shopping from "../../assets/icons/shopping.svg";
import restaurant from "../../assets/icons/restaurant.svg";
import { BsBookmarkStar } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { home } from "../../apis/main/index";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";

interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
}

const categoryIcons: Record<Category, string> = {
  숙소: place,
  맛집: restaurant,
  쇼핑: shopping,
  문화: festival,
};

const ImageSlider: React.FC = () => {
  const [category, setCategory] = useState<Category>("숙소");
  const [spots, setSpots] = useState<SpotBasicPreviewDto[]>([]);
  const [markedSpots, setMarkedSpots] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [placeData, setPlaceData] = useState(null);

  const stadium = "사직";
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await home.place(stadium, category);
        setPlaceData(response.data);
        // API 응답에서 spotPreviewDtos를 spots 상태로 설정
        setSpots(response.data.spotPreviewDtos || []);
      } catch (err) {
        console.error("Error fetching place data:", err);
      }
    };

    fetchPlaceData();
  }, [stadium, category]);

  const onClickMark = (contentId: number) => {
    setMarkedSpots((prev) => ({
      ...prev,
      [contentId]: !prev[contentId],
    }));
  };

  if (!placeData) return <div>Loading...</div>;
  return (
    <Container>
      <CategoryButtons>
        {(["숙소", "맛집", "쇼핑", "문화"] as Category[]).map((cat) => (
          <CategoryButton
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
            <img src={categoryIcons[cat as Category]} alt={`${cat} icon`} />
          </CategoryButton>
        ))}
      </CategoryButtons>
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

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  padding: 20px clamp(20px, 28.68vw, 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: clamp(40px, 30vw, 720px);
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 0px;
  margin-bottom: 20px;
  width: clamp(44vw, 51vw, 51vw);
  justify-content: space-around;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  position: relative;
  width: clamp(100px, 11vw, 24px);
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  border-bottom: ${(props) => (props.active ? "1px solid #000000" : "none")};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.1s ease;
  font-size: clamp(13px, 1.6vw, 24px);

  img {
    position: absolute;
    top: -3px;
    right: -10px;
    width: clamp(8px, 1.38vw, 20px);
    height: 20px;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

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
