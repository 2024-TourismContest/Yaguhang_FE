import Card from "../../components/home/Card";
import ImageSlider from "../../components/home/imageSlider";
import * as S from "../../styles/common/TitleSection";
import marker from "../../assets/images/marker.png";
import HeroCarousel from "./HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";
import WeatherCard from "../../components/home/WeatherCard";
import styled from "styled-components";
import WeatherGraph from "../../components/home/WeatherGraph";

const HomePage = () => {
  return (
    <>
      <HeroCarousel teams={heroData.teams} />
      <HomePageContainer className="home-page">
        <RoundBackground />
        <Card />
        <S.Wrapper>
          <S.TitleWrapper>
            <S.Span>
              <div>
                <S.Fan>자이언츠 팬들에게 추천하는</S.Fan>
                <S.Title>사직의 핫플레이스</S.Title>
              </div>
              <S.MarkerImg src={marker} />
            </S.Span>
            <S.H4>
              열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이
              풍족하도록!
            </S.H4>
          </S.TitleWrapper>
        </S.Wrapper>
        <ImageSlider />
        <WeatherContainer>
          <WeatherCard />
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
  padding: 0 16vw;
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
  height: 1600px;
  background-color: #000000;
  border-radius: 100%;
  transform: translate(-50%, -30%);
  z-index: 0;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4vw;
`;

const ScrollContainer = styled.div`
  width: 100vw;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #f5f5f5;
`;

export default HomePage;