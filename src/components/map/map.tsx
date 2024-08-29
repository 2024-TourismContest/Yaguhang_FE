import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpotsByStadium } from "../../apis/map";
import useMap from "./useMap";
import usePositionStore from "../../store/MapPositionsStore";

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
  boolean: boolean;
}
export interface Position {
  contentId: number;
  title: string;
  address: string;
  mapX: number;
  mapY: number;
  image: string;
  reviewCount: string;
  isScrapped: boolean;
}

const MapTest: React.FC<MapTestProps> = ({
  category,
  selectedTeamId,
  mapX,
  mapY,
  boolean,
}) => {
  const [visible, setVisible] = useState(true);
  const [positions, setPosition] = useState<Position[]>([]);
  const { center, level } = useMap(mapX, mapY, positions);

  useEffect(() => {
    setVisible(true);
  }, [center]);

  useEffect(() => {
    if (mapX && mapY && boolean) {
      handleButtonClick();
    }
  }, [boolean, selectedTeamId, category, mapX, mapY]);

  const handleButtonClick = async () => {
    try {
      const response = await getSpotsByStadium(
        selectedTeamId,
        category,
        level,
        mapX,
        mapY
      );
      setPosition(response.data);
      usePositionStore.getState().setPositions(response.data);
      if (response.data) {
        setVisible(false);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <>
      <MapWrapper>
        <div id="map" style={{ width: "65vw", height: "35vw" }}></div>
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
