
import Card from "../../components/home/Card";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import heroData from "./dummydata.json";

const HomePage: React.FC = () => {
  return (
    <>
      <Card />
    <HeroCarousel teams={heroData.teams} />
    </>
  );
};

export default HomePage;