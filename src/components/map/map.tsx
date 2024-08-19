import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpotsByStadium } from "../../apis/map";

declare global {
  interface Window {
    kakao: any;
  }
}
interface MapTestProps {
  selectedTeamId: number;
  mapX?: number;
  mapY?: number;
}

const MapTest: React.FC<MapTestProps> = ({ selectedTeamId, mapX, mapY }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_REACT_APP_KAKAO_KEY
    }&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(35.1944007, 129.061996459),
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);

        window.kakao.maps.event.addListener(kakaoMap, "idle", () => {
          console.log("변경됨");
        });
      });
    };

    document.head.appendChild(script);
  }, [mapX, mapY, selectedTeamId]);

  const handleButtonClick = async () => {
    const dummyCategory = "숙소"; // 예: 'restaurant' 카테고리
    const dummyLevel = 1; // 예: 3단계 필터링
    const dummyNowX = 129.06199645996094; // 예: 현재 위치의 X좌표 (경도)
    const dummyNowY = 35.194400787353516; // 예: 현재 위치의 Y좌표 (위도)

    try {
      const response = await getSpotsByStadium(
        selectedTeamId,
        dummyCategory,
        dummyLevel,
        dummyNowX,
        dummyNowY
      );
      console.log(response);
    } catch (error) {}
  };

  return (
    <>
      <MapWrapper>
        <div id="map" style={{ width: "50vw", height: "30vw" }}></div>
        <Button onClick={handleButtonClick}>현 위치에서 검색</Button>
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
