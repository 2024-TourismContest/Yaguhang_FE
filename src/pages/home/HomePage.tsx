import { useState } from "react";
import Card from "../../components/home/Card";
import ImageSlider from "../../components/home/imageSlider";
import HeroCarousel from "./HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";
import { CategorySelector } from "../../components/home/CategorySelector";
import { TitleSection } from "./TitleSection";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("숙소");

  return (
    <>
      <HeroCarousel teams={heroData.teams} />
      <Card />
      <CategorySelector
        category={selectedCategory}
        setCategory={setSelectedCategory}
        color="white"
      />
      <TitleSection />
      <ImageSlider />
    </>
  );
};

export default HomePage;
