import React from "react";
import HeroCarousel from "./HeroCarousel";
import heroData from "./dummydata.json";

import Card from "../../components/home/Card";

const HomePage: React.FC = () => {
  return (
    <>
    <HeroCarousel teams={heroData.teams} />
      <Card />
    </>
  );
};

export default HomePage;