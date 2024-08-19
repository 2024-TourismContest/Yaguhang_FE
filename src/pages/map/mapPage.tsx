import { CategorySelector } from "../../components/home/CategorySelector";
import { useState, useEffect } from "react";
import MapTest from "../../components/map/map";
import { useParams } from "react-router-dom";
import Category from "../../components/home/Category";
import { teamLogos } from "../../components/home/Card";
import { teamToStadiumMap } from "../../assets/data/data";
import useTeamStore from "../../store/TeamStore";
import { getStadiumCoordinate } from "../../apis/map";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";

interface MapTestProps {
  selectedTeamId: number;
  mapX: number;
  mapY: number;
}
interface StadiumCoordinate {
  name: string;
  stadiumId: number;
  mapX: number;
  mapY: number;
}

const MapPage = () => {
  const { category, urlTeam } = useParams<{
    category: string;
    urlTeam: string;
  }>();
  const isValidCategory = (category: string): category is Category => {
    return ["숙소", "맛집", "쇼핑", "문화"].includes(category);
  };
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    category && isValidCategory(category) ? category : "숙소"
  );

  const { selectedTeam, setSelectedTeam } = useTeamStore();

  const stadiumNumber = teamToStadiumMap[selectedTeam];
  useEffect(() => {
    setSelectedTeam(urlTeam ? urlTeam : "LG");
  }, []);
  const fetchStadiumData = async () => {
    try {
      const stadiumNumber = teamToStadiumMap[selectedTeam];
      if (stadiumNumber) {
        const response = await getStadiumCoordinate(stadiumNumber);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching stadium coordinates:", error);
    }
  };
  return (
    <>
      <div style={{ width: "100vw", height: "13vh" }}></div>
      <CategorySelector
        category={selectedCategory}
        setCategory={setSelectedCategory}
        color="white"
      />
      <MapTest selectedTeamId={stadiumNumber ? stadiumNumber : 1} />
      <Category filterSchedules={fetchStadiumData} teamLogos={teamLogos} />
    </>
  );
};
export default MapPage;
