import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getStadiumCoordinate, getSpotsByStadium } from "../../apis/map";
import { teamToStadiumMap } from "../../assets/data/data";
import { teamLogos } from "../../components/home/Card";
import { CategorySelector } from "../../components/home/CategorySelector";
import MapTest from "../../components/map/map";
import Category from "../../components/stadium/Category";
import useTeamStore from "../../store/TeamStore";
import { MapPosition } from "../../components/map/MapPosition";
import { SelectedPosition } from "../../components/map/SelectedPosition";
import { styled } from "styled-components";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";
export interface Position {
  contentId: number;
  title: string;
  address: string;
  mapX: number;
  mapY: number;
  image: string;
}

const MapPage = () => {
  window.scrollTo(0, 0);
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
  }>();
  const latestTeamRef = useRef<string>(selectedTeam);
  const stadiumNumber = teamToStadiumMap[selectedTeam];
  useEffect(() => {
    latestTeamRef.current = selectedTeam;
  }, [selectedTeam, mapCoordinates]);

  const fetchStadiumData = async () => {
    try {
      if (stadiumNumber) {
        const response = await getStadiumCoordinate(stadiumNumber);

        if (latestTeamRef.current === selectedTeam) {
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
      <div style={{ width: "100vw", height: "14vh" }}></div>
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
        boolean={latestTeamRef.current === selectedTeam}
      />
      <Category filterSchedules={fetchStadiumData} teamLogos={teamLogos} />
      <SelectedPosition />
      <Hr />
      <MapPosition />
    </>
  );
};

export default MapPage;
const Hr = styled.hr`
  width: 70%;
  border-bottom: 1px solid #c8c3c3;
  margin-top: 50px;
  margin-bottom: 50px;
`;
