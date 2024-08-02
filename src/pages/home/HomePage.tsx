import React from "react";
import HeroCarousel from "./HeroCarousel";
import heroData from "./dummydata.json";

const HomePage: React.FC = () => {
  return (
    <HeroCarousel teams={heroData.teams} />
  );
};

export default HomePage;