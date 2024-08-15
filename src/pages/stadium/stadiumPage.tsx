import { useState } from "react";
import Category from "../../components/home/Category";
import { teamLogos } from "../../components/home/Card";
import { CategorySelector } from "../../components/home/CategorySelector";
import ImageSlider from "../../components/home/imageSlider";
type Category = "숙소" | "맛집" | "쇼핑" | "문화";
const StadiumPage = () => {
  const fetchSchedules = async () => {
    console.log("선택된팀");
  };
  const [selectedCategory, setSelectedCategory] = useState<Category>("숙소");
  return (
    <>
      <div style={{ width: "100vw", height: "20vh" }}></div>
      <Category filterSchedules={fetchSchedules} teamLogos={teamLogos} />
      <CategorySelector
        category={selectedCategory}
        setCategory={setSelectedCategory}
        color="white"
      />
      <ImageSlider />
    </>
  );
};
export default StadiumPage;
