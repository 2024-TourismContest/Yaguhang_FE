import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dummy } from "./dummy";
import left from "../../assets/icons/arrow_left.svg";
import right from "../../assets/icons/arrow_right.svg";

// 타입 정의
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
  margin: clamp(40px, 7vw, 150px) auto;
  /* margin-top: 20px; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.h2`
  font-size: 2.4vw;
  font-size: clamp(24px, 2.4vw, 36px);
  margin-bottom: 20px;
  font-weight: 600;
  color: white;
`;
const H4 = styled.h4`
  font-size: 1.3vw;
  font-size: clamp(13.5px, 1.3vw, 24px);
  margin-bottom: 20px;
  color: #a2a2a2;
  font-weight: 400;
`;
const MoreButton = styled.button`
  color: white;
  background-color: transparent;
  font-size: 1.3vw;
  outline: none;
  box-shadow: none;
  border: none;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 0px;
  margin-bottom: 20px;
  width: 51vw;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  width: 10.5vw;
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  border-bottom: ${(props) => (props.active ? "1px solid #ffffff" : "none")};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.5s ease;
  font-size: clamp(18px, 1.6vw, 24px);
`;

const SlideContainer = styled.div`
  position: relative;
  width: 14vw;
  overflow: hidden;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideImage = styled.img`
  width: calc(100% - 10px);
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
`;

const SlideInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
  color: white;
  padding: 10px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;
  padding: 0 22px 24.65px 22px;
`;

const SlideName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const SlideAddress = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
`;

const StyledSlider = styled(Slider)`
  width: 90%;
  /* height: 373px;/// */
  .slick-prev,
  .slick-next {
    &:before {
      display: none;
    }
  }
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 0;
  z-index: 10;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: transparent;
  }
`;

const PrevArrow = styled(ArrowButton)`
  left: -50px;
  z-index: 100;
`;

const NextArrow = styled(ArrowButton)`
  right: -50px;
  z-index: 100;
`;

const ArrowImage = styled.img`
  width: 30px; // 원하는 크기로 조정
  height: 30px;
  z-index: 100;
  color: white;
`;

const ImageSlider: React.FC = () => {
  const [category, setCategory] = useState<Category>("숙소");
  const [spots, setSpots] = useState<SpotBasicPreviewDto[]>([]);

  useEffect(() => {
    setSpots(dummy[category] || []);
  }, [category]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrow: true,
    prevArrow: (
      <PrevArrow>
        <ArrowImage src={left} alt="Previous" />
      </PrevArrow>
    ),
    nextArrow: (
      <NextArrow>
        <ArrowImage src={right} alt="Next" />
      </NextArrow>
    ),
  };

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>KT 팬들에게 추천하는 잠실의 핫플레이스!</Title>
          <H4>
            열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이 풍족하도록!
          </H4>
        </TitleWrapper>
        <MoreButton>More +</MoreButton>
      </Wrapper>
      <CategoryButtons>
        {["숙소", "맛집", "쇼핑", "문화"].map((cat) => (
          <CategoryButton
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat as Category)}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryButtons>
      <StyledSlider {...settings}>
        {spots.map((spot) => (
          <SlideContainer key={spot.contentId}>
            <SlideImage src={spot.imageUrl} alt={spot.name} />
            <SlideInfo>
              <SlideName>{spot.name}</SlideName>
              <SlideAddress>{spot.address}</SlideAddress>
            </SlideInfo>
          </SlideContainer>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default ImageSlider;
