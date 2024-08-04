import Card from "../../components/home/Card";
import HeroCarousel from "../../components/home/HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";
import Weather from "../../components/home/Weather"
import styled from "styled-components";

const HomePage: React.FC = () => {
  return (
    <>
    <HeroCarousel teams={heroData.teams} />
    <HomeContainer>
      <Card />
      <Weather />
    </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  padding: 0 16vh
`
export default HomePage;