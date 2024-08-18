import { useState, useEffect } from "react";
import Card from "../../components/home/Card";
import ImageSlider from "../../components/home/imageSlider";
import HeroCarousel from "../../components/home/HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";
import WeatherCard from "../../components/home/WeatherCard";
import styled from "styled-components";
import WeatherGraph from "../../components/home/WeatherGraph";
import { CategorySelector } from "../../components/home/CategorySelector";
import { TitleSection } from "./TitleSection";
import { home } from "../../apis/main";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";
interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
}

interface PlaceData {
  spotPreviewDtos: SpotBasicPreviewDto[];
  // 필요시 다른 필드 추가
}
const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("숙소");
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const navigate = useNavigate();
  const stadium = "사직";

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await home.place(stadium, selectedCategory);
        setPlaceData(response.data);
      } catch (err) {
        console.error("카테고리별추천 에러:", err);
      }
    };
    fetchPlaceData();
  }, [selectedCategory]);

  const handleButtonClick = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <>
      <HeroCarousel teams={heroData.teams} />
      <HomePageContainer className="home-page">
        <RoundBackground />
        <Card />
          <Button
            text="MY 야구공 스탬프 모아보기 "
            onClick={() => handleButtonClick("mypage")}
            bgColor="#FF0000"
          />
          <TitleSection />
          <CategorySelector
            category={selectedCategory}
            setCategory={setSelectedCategory}
            color="white"
          />
          <ImageSlider spots={placeData?.spotPreviewDtos || []} />
          <Button
            text="야구선수 PICK 보러가기"
            onClick={() => handleButtonClick("stadium")}
          />
        <WeatherContainer>
          <WeatherCard gameId={38}/>
          <ScrollContainer>
            <WeatherGraph gameId={38} />
          </ScrollContainer>
        </WeatherContainer>
      </HomePageContainer>
    </>
  );
};

const HomePageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  & > * {
    position: relative;
    z-index: 0;
  }
`;
const RoundBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 180vw; 
  height: 1700px;
  background-color: #000000;
  border-radius: 100%;
  transform: translate(-50%, -30%);
  z-index: 0;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 16vw;
  gap: 4vw;
`;

const ScrollContainer = styled.div`
  width: 100vw;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #f5f5f5;
`;

export default HomePage;