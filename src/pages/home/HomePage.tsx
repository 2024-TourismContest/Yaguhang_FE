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
  // Add other fields if necessary
}

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("숙소");
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const navigate = useNavigate();
  const { selectedGame } = useTeamStore();
  const selectedTeam = useTeamStore((state) => state.selectedTeam);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await home.place("사직", selectedCategory);
        setPlaceData(response.data);
      } catch (err) {
        console.error("카테고리별추천 에러:", err);
      }
    };
    fetchPlaceData();
  }, [selectedCategory, selectedTeam]);

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
        <TitleSection
          subtitle={`${selectedTeam} 팬들에게 추천하는`}
          title="사직의 핫플레이스"
          description="열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이 풍족하도록!"
          icon="marker"
        />
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
          <>
            <TitleSection
              title="현재 잠실구장의 날씨는?"
              description="오늘은 비가 안와야 할텐데.."
            />
            <WeatherContainer>
              <WeatherCard gameId={selectedGame.id} />
              <WeatherGraph gameId={selectedGame.id} />
            </WeatherContainer>
          </>
        )}
      </HomePageContainer>
    </>
  );
};

const HomePageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  justify-content: center;
`;

const RoundBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2700px;
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
  max-width: 1200px;
  gap: 4vw;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 50px;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 0 4vw;
  }
`;

export default HomePage;
