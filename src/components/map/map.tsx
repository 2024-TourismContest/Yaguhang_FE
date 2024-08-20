import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpotsByStadium } from "../../apis/map";
import useMap from "./useMap";
import { teamToStadiumMap } from "../../assets/data/data";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";
declare global {
  interface Window {
    kakao: any;
  }
}
interface MapTestProps {
  selectedTeamId: number;
  mapX: number;
  mapY: number;
  category: Category;
}
type Location = {
  contentId: number;
  title: string;
  address: string;
  mapX: number;
  mapY: number;
  image: string;
};

const MapTest: React.FC<MapTestProps> = ({
  category,
  selectedTeamId,
  mapX,
  mapY,
}) => {
  const [visible, setVisible] = useState(false);
  const { center, level, map } = useMap(mapX, mapY);

  useEffect(() => {
    setVisible(true);
  }, [center]);

  const handleButtonClick = async () => {
    setVisible(false);
    console.log("선택팀", selectedTeamId);
    try {
      const response = await getSpotsByStadium(
        selectedTeamId,
        category,
        level,
        mapX,
        mapY
      );
      console.log("로케이션", response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <>
      <MapWrapper>
        <div id="map" style={{ width: "50vw", height: "30vw" }}></div>
        {visible && (
          <Button onClick={handleButtonClick}>현 위치에서 검색</Button>
        )}
      </MapWrapper>
    </>
  );
};

export default MapTest;

const MapWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  position: relative;
`;
const Button = styled.button`
  position: absolute;
  width: 150px;
  height: 35px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;
