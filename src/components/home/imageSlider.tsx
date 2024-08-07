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

type Category = "숙소" | "맛집" | "쇼핑" | "문화";

interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
}

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
  width: clamp(120px, 11.55vw, 370px);
  height: clamp(150px, 14.99vw, 370px);
  overflow: hidden;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SlideImage = styled.img`
  width: clamp(120px, 11.55vw, 370px);
  height: clamp(150px, 14.99vw, 370px);
  object-fit: cover;
  border-radius: 10px;
`;

const SlideInfo = styled.div`
  z-index: 5;
  position: absolute;
  width: clamp(120px, 11.55vw, 370px);
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
  width: 49.02vw;
  width: clamp(500px, 49.02vw, 750px);
  display: flex;
  align-items: center;
`;

const categoryIcons: Record<Category, string> = {
  숙소: place,
  맛집: restaurant,
  쇼핑: shopping,
  문화: festival,
};

const ImageSlider: React.FC = () => {
  const url = `http://tong.visitkorea.or.kr/cms/resource/86/2832286_image2_1.jpg`;
  const [category, setCategory] = useState<Category>("숙소");
  const [spots, setSpots] = useState<SpotBasicPreviewDto[]>([]);
  const [markedSpots, setMarkedSpots] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    setSpots(dummy[category]);
  }, [category]);

  const onClickMark = (contentId: number) => {
    setMarkedSpots((prev) => ({
      ...prev,
      [contentId]: !prev[contentId],
    }));
  };

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
            <SlideImage src={url} alt={spot.name} />
            <SlideInfo>
              <span>
                <SlideName>{spot.name}</SlideName>
                <SlideAddress>{spot.address}</SlideAddress>
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

const dummy = {
  숙소: [
    {
      contentId: 11,
      name: "숙소1",
      address: "서울특별시 송파구",
      imageUrl: "https://loremflickr.com/270/370/kitty",
    },
    {
      contentId: 12,
      name: "숙소2",
      address: "서울특별시 마포구",
      imageUrl: "https://loremflickr.com/270/370/tiger",
    },
    {
      contentId: 13,
      name: "숙소3",
      address: "서울특별시 종로구",
      imageUrl: "https://loremflickr.com/270/370/cat",
    },
    {
      contentId: 14,
      name: "숙소4",
      address: "서울특별시 강남구",
      imageUrl: "https://loremflickr.com/270/370/dog",
    },
  ],
  맛집: [
    {
      contentId: 1,
      name: "맛집1",
      address: "서울특별시 강남구",
      imageUrl: "https://loremflickr.com/270/370/bread",
    },
    {
      contentId: 2,
      name: "맛집2",
      address: "서울특별시 강북구",
      imageUrl: "https://loremflickr.com/270/370/coffee",
    },
    {
      contentId: 3,
      name: "맛집3",
      address: "서울특별시 서대문구",
      imageUrl: "https://loremflickr.com/270/370/sushi",
    },
    {
      contentId: 4,
      name: "맛집4",
      address: "서울특별시 용산구",
      imageUrl: "https://loremflickr.com/270/370/meat",
    },
  ],
  쇼핑: [
    {
      contentId: 21,
      name: "쇼핑몰1",
      address: "서울특별시 동대문구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 22,
      name: "쇼핑몰2",
      address: "서울특별시 서대문구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 23,
      name: "쇼핑몰3",
      address: "서울특별시 광진구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 24,
      name: "쇼핑몰4",
      address: "서울특별시 중구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
  ],
  문화: [
    {
      contentId: 31,
      name: "문화공간1",
      address: "서울특별시 강동구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 32,
      name: "문화공간2",
      address: "서울특별시 성동구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 33,
      name: "문화공간3",
      address: "서울특별시 강남구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 34,
      name: "문화공간4",
      address: "서울특별시 중랑구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
  ],
};
