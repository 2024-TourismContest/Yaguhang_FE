import { CategorySelector } from "../../components/home/CategorySelector";
import { useState, useEffect, useRef } from "react";
import MapTest from "../../components/map/map";
import { useParams } from "react-router-dom";
import Category from "../../components/stadium/Category";
import { teamLogos } from "../../components/home/Card";
import { teamToStadiumMap } from "../../assets/data/data";
import useTeamStore from "../../store/TeamStore";
import { getStadiumCoordinate } from "../../apis/map";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";

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

  const [mapCoordinates, setMapCoordinates] = useState<{
    mapX: number;
    mapY: number;
  } | null>(null);

  const latestTeamRef = useRef<string>(selectedTeam);

  useEffect(() => {
    latestTeamRef.current = selectedTeam;
  }, [selectedTeam]);

  const fetchStadiumData = async () => {
    try {
      const stadiumNumber = teamToStadiumMap[selectedTeam];
      if (stadiumNumber) {
        const response = await getStadiumCoordinate(stadiumNumber);

        // 선택된 팀이 가장 최근에 선택된 팀이 맞는지 체크
        if (latestTeamRef.current === selectedTeam) {
          console.log(stadiumNumber, selectedTeam);
          setMapCoordinates({
            mapX: response.mapX,
            mapY: response.mapY,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching stadium coordinates:", error);
    }
  };

  useEffect(() => {
    setSelectedTeam(urlTeam ? urlTeam : selectedTeam);
    fetchStadiumData();
  }, [urlTeam]);

  useEffect(() => {
    fetchStadiumData();
  }, [selectedTeam]);

  return (
    <>
      <div style={{ width: "100vw", height: "13vh" }}></div>
      <CategorySelector
        category={selectedCategory}
        setCategory={setSelectedCategory}
        color="white"
      />
      <MapTest
        selectedTeamId={teamToStadiumMap[selectedTeam] || 1}
        mapX={mapCoordinates ? mapCoordinates.mapX : 126.9786567}
        mapY={mapCoordinates ? mapCoordinates.mapY : 37.566826}
        category={selectedCategory}
      />
      <Category filterSchedules={fetchStadiumData} teamLogos={teamLogos} />
    </>
  );
};

export default MapPage;
