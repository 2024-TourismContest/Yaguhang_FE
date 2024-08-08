import Card from "../../components/home/Card";
import ImageSlider from "../../components/home/imageSlider";
import * as S from "../../styles/common/TitleSection";
import marker from "../../assets/images/marker.png";
import HeroCarousel from "./HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";
import WeatherCard from "../../components/home/WeatherCard"
import styled from "styled-components";
import WeatherGraph from "../../components/home/WeatherGraph";

const HomePage: React.FC = () => {
  return (
    <>
    <HeroCarousel teams={heroData.teams} />
    <HomeContainer>
      <Card />
      <HeroCarousel teams={heroData.teams} />
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
            열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이 풍족하도록!
          </S.H4>
        </S.TitleWrapper>
      </S.Wrapper>
      <ImageSlider />
      <WeatherContainer>
        <WeatherCard />
        <ScrollContainer>
          <WeatherGraph/>
        </ScrollContainer>
      </WeatherContainer>
    </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  padding: 0 16vh
`

const WeatherContainer = styled.div`
display: flex;
flex-direction: row;
gap: 4vw;
`

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #f5f5f5;
`
export default HomePage;
