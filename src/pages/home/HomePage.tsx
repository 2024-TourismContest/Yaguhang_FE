import React, { useState, useEffect } from "react";
import WeatherCard from "../../components/home/WeatherCard";
import styled from "styled-components";
import WeatherGraph from "../../components/home/WeatherGraph";
import { useNavigate } from "react-router-dom";
import { home } from "../../apis/main";
import { Button } from "../../components/button/Button";
import Card from "../../components/home/Card";
import { CategorySelector } from "../../components/home/CategorySelector";
import ImageSlider from "../../components/home/imageSlider";
import heroData from "../../dummy-data/dummy-hero-data.json";
import HeroCarousel from "../../components/home/HeroCarousel";
import { TitleSection } from "./TitleSection";
import useTeamStore from "../../store/TeamStore";

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
  const { selectedGame } = useTeamStore();

  useEffect(() => {
    console.log("Selected Game:", selectedGame); // 콘솔에 selectedGame 값 출력
  }, [selectedGame]);

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
          text="MY 야구공 스탬프 모아보기"
          onClick={() => handleButtonClick("mypage")}
          bgColor="#FF0000"
        />
        <TitleSection />
        <CategorySelector
          category={selectedCategory}
          setCategory={setSelectedCategory}
          color="white"
        />
        <ImageSlider
          category={selectedCategory}
          spots={placeData?.spotPreviewDtos || []}
        />
        <Button
          text="야구선수 PICK 보러가기"
          onClick={() => handleButtonClick("stadium")}
        />
        {selectedGame?.id && (
          <WeatherContainer>
            <WeatherCard gameId={selectedGame.id} />
            <ScrollContainer>
              <WeatherGraph gameId={selectedGame.id} />
            </ScrollContainer>
          </WeatherContainer>
        )}
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
  height: 1300px;
  background-color: #000000;
  border-radius: 100%;
  transform: translate(-50%, -30%);
  z-index: 0;

  @media (max-width: 768px) {
    width: 300vw;
    height: 1200px;
    transform: translate(-50%, -20%);
  }
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 16vw;
  gap: 4vw;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 8vw;
  }

  @media (max-width: 768px) {
    padding: 0 4vw;
  }
`;

const ScrollContainer = styled.div`
  width: 100vw;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default HomePage;