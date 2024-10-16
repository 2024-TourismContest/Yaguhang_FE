import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStadiumCoordinate } from "../../apis/map";
import { teamToStadiumMap } from "../../assets/data/data";
import { CategorySelector } from "../../components/home/CategorySelector";
import Map from "../../components/map/map";
import { MapPosition } from "../../components/map/MapPosition";
import { SelectedPosition } from "../../components/map/SelectedPosition";
import Category from "../../components/stadium/Category";
import useTeamStore from "../../store/TeamStore";
import { teamLogos } from "../../types/teamLogos";
type Category = "숙소" | "맛집" | "쇼핑" | "문화" | "선수PICK";

export interface Position {
  contentId: number;
  title: string;
  address: string;
  mapX: number;
  mapY: number;
  image: string;
  stadiumId: number;
}

const MapPage = () => {
  window.scrollTo(0, 0);
  const { category, urlTeam } = useParams<{
    category: string;
    urlTeam: string;
  }>();
  const isValidCategory = (category: string): category is Category => {
    return ["숙소", "맛집", "쇼핑", "문화", "선수PICK"].includes(category);
  };
  const [selectedCategory, setSelectedCategory] = useState<string>(
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

  const navigate = useNavigate();
  const onClickContent = (contentId: number, stadiumId: number | string) => {
    navigate(`/details/${category}/${contentId}?stadiumId=${stadiumId}`);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div style={{ width: "100vw", height: "14vh" }}></div>
      <CategorySelector
        category={selectedCategory}
        setCategory={setSelectedCategory}
        color="white"
        categoryList={["선수PICK", "숙소", "맛집", "쇼핑", "문화"]}
      />
      <Map
        selectedTeamId={teamToStadiumMap[selectedTeam] || 1}
        mapX={mapCoordinates ? mapCoordinates.mapX : 126.9786567}
        mapY={mapCoordinates ? mapCoordinates.mapY : 37.566826}
        category={selectedCategory}
        boolean={latestTeamRef.current === selectedTeam}
      />
      <Category filterSchedules={fetchStadiumData} teamLogos={teamLogos} />
      <SelectedPosition onClickContent={onClickContent} />
      <MapPosition onClickContent={onClickContent} />
    </>
  );
};

export default MapPage;
