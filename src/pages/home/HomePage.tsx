import Card from "../../components/home/Card";
import HeroCarousel from "./HeroCarousel";
import heroData from "./dummydata.json";

const HomePage: React.FC = () => {
  return (
    <>
    <HeroCarousel teams={heroData.teams} />
      <Card />
    </>
  );
};

export default HomePage;