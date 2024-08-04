import Card from "../../components/home/Card";
import HeroCarousel from "../../components/home/HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";

const HomePage: React.FC = () => {
  return (
    <>
    <HeroCarousel teams={heroData.teams} />
      <Card />
    </>
  );
};

export default HomePage;