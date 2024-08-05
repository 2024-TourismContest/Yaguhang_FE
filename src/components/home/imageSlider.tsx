import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import img from "/dummyImg.png";
import festival from "../../assets/icons/festival.svg";
import place from "../../assets/icons/place.svg";
import shopping from "../../assets/icons/shopping.svg";
import restaurant from "../../assets/icons/restaurant.svg";
type Category = "숙소" | "맛집" | "쇼핑" | "문화";
import { BsBookmarkStar } from "react-icons/bs";

interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
}

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  margin: clamp(40px, 7vw, 200px) auto;
  padding: 20px;
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
  font-size: clamp(18px, 1.6vw, 24px);

  img {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: clamp(120px, 11.55vw, 370px);
  height: clamp(150px, 14.99vw, 370px);
  overflow: hidden;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid magenta;
`;

const SlideImage = styled.img`
  width: clamp(120px, 11.55vw, 370px);
  height: 100%;
  object-fit: cover;
  object-fit: cover;
  border-radius: 10px;
  background-color: red;
`;

const SlideInfo = styled.div`
  position: absolute;
  width: clamp(120px, 11.55vw, 370px);
  border: 1px solid magenta;
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
`;

const StyledSlider = styled(Slider)`
  width: 49.02vw;
  width: clamp(500px, 49.02vw, 750px);
  .slick-prev,
  .slick-next {
    &:before {
      display: none;
    }
  }
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

  useEffect(() => {
    setSpots(dummy[category]);
  }, [category]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
  };

  return (
    <Container>
      {/* <img src={img} /> */}
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
      <StyledSlider {...settings}>
        {spots.map((spot) => (
          <SlideContainer key={spot.contentId}>
            <SlideImage src={url} alt={spot.name} />
            <SlideInfo>
              <span>
                <SlideName>{spot.name}</SlideName>
                <SlideAddress>{spot.address}</SlideAddress>
              </span>
              <BsBookmarkStar />
            </SlideInfo>
          </SlideContainer>
        ))}
      </StyledSlider>
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
    {
      contentId: 15,
      name: "숙소5",
      address: "서울특별시 강북구",
      imageUrl: "https://loremflickr.com/270/370/panda",
    },
    {
      contentId: 16,
      name: "숙소6",
      address: "서울특별시 서초구",
      imageUrl: "https://loremflickr.com/270/370/puppy",
    },
    {
      contentId: 17,
      name: "숙소7",
      address: "서울특별시 은평구",
      imageUrl: "https://loremflickr.com/270/370/korea",
    },
    {
      contentId: 18,
      name: "숙소8",
      address: "서울특별시 동작구",
      imageUrl: "https://loremflickr.com/270/370/home,7",
    },
    {
      contentId: 19,
      name: "숙소9",
      address: "서울특별시 관악구",
      imageUrl: "https://loremflickr.com/270/370/home,8",
    },
    {
      contentId: 20,
      name: "숙소10",
      address: "서울특별시 노원구",
      imageUrl: "https://loremflickr.com/270/370/home,9",
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
    {
      contentId: 5,
      name: "맛집5",
      address: "서울특별시 성동구",
      imageUrl: "https://loremflickr.com/270/370/hamburger",
    },
    {
      contentId: 6,
      name: "맛집6",
      address: "서울특별시 마포구",
      imageUrl: "https://loremflickr.com/270/370/pork",
    },
    {
      contentId: 7,
      name: "맛집7",
      address: "서울특별시 중구",
      imageUrl: "https://loremflickr.com/270/370/pasta",
    },
    {
      contentId: 8,
      name: "맛집8",
      address: "서울특별시 동작구",
      imageUrl: "https://loremflickr.com/270/370/coffee",
    },
    {
      contentId: 9,
      name: "맛집9",
      address: "서울특별시 강서구",
      imageUrl: "https://loremflickr.com/270/370/pizza",
    },
    {
      contentId: 10,
      name: "맛집10",
      address: "서울특별시 송파구",
      imageUrl: "https://loremflickr.com/270/370/cookie",
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
    {
      contentId: 25,
      name: "쇼핑몰5",
      address: "서울특별시 종로구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 26,
      name: "쇼핑몰6",
      address: "서울특별시 성북구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 27,
      name: "쇼핑몰7",
      address: "서울특별시 강남구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 28,
      name: "쇼핑몰8",
      address: "서울특별시 강북구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 29,
      name: "쇼핑몰9",
      address: "서울특별시 관악구",
      imageUrl: "https://loremflickr.com/270/370/shopping",
    },
    {
      contentId: 30,
      name: "쇼핑몰10",
      address: "서울특별시 노원구",
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
    {
      contentId: 35,
      name: "문화공간5",
      address: "서울특별시 도봉구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 36,
      name: "문화공간6",
      address: "서울특별시 노원구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 37,
      name: "문화공간7",
      address: "서울특별시 구로구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 38,
      name: "문화공간8",
      address: "서울특별시 양천구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 39,
      name: "문화공간9",
      address: "서울특별시 서대문구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
    {
      contentId: 40,
      name: "문화공간10",
      address: "서울특별시 마포구",
      imageUrl: "https://loremflickr.com/270/370/culture",
    },
  ],
};
