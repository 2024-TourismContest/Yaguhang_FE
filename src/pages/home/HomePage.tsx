import Card from "../../components/home/Card";
import HeroCarousel from "../../components/home/HeroCarousel";
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