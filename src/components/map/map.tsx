import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpotsByStadium } from "../../apis/map";
import useMap from "./useMap";

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
interface Position {
  contentId: number;
  title: string;
  address: string;
  mapX: number;
  mapY: number;
  image: string;
}

const MapTest: React.FC<MapTestProps> = ({
  category,
  selectedTeamId,
  mapX,
  mapY,
}) => {
  const [visible, setVisible] = useState(true);
  const [positions, setPosition] = useState<Position[]>([]);
  const { center, level } = useMap(mapX, mapY, positions);
  console.log(level);

  useEffect(() => {
    // handleButtonClick();
    setVisible(true);
  }, [selectedTeamId]);
  useEffect(() => {
    setVisible(true);
    // handleButtonClick();
  }, [center]);

  const handleButtonClick = async () => {
    setVisible(false);
    try {
      const response = await getSpotsByStadium(
        selectedTeamId,
        category,
        level,
        mapX,
        mapY
      );
      setPosition(response.data);
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
