import { useEffect, useState } from "react";
import usePositionStore from "../../store/MapPositionStore";
import { Position } from "./map";
type MapCenter = {
  lat: number;
  lng: number;
};

const useMap = (mapX: number, mapY: number, positions: Position[]) => {
  const [map, setMap] = useState(null);
  const [level, setLevel] = useState<number>(5);
  const [center, setCenter] = useState<MapCenter>({
    lat: mapY,
    lng: mapX,
  });
  const [markers, setMarkers] = useState<any[]>([]);
  const setPosition = usePositionStore((state) => state.setPosition);
  useEffect(() => {
    // 카카오 맵 SDK 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_REACT_APP_KAKAO_KEY
    }&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(mapY, mapX),
          level: level,
        };

        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);

        // 마커를 생성하고 기존 마커 제거하는 함수
        const createMarkers = () => {
          // 이전 마커들 제거
          markers.forEach((marker) => marker.setMap(null));

          // 새로운 마커 생성
          const newMarkers = positions.map((position) => {
            const marker = new window.kakao.maps.Marker({
              map: kakaoMap,
              position: new window.kakao.maps.LatLng(
                position.mapY,
                position.mapX
              ),
              title: position.title,
              clickable: true, // 마커 클릭 가능하게 설정
            });

            // 마커 클릭 이벤트 리스너 추가
            window.kakao.maps.event.addListener(marker, "click", () => {
              setPosition(position);
            });

            return marker;
          });

          // 새로 생성된 마커들을 저장
          setMarkers(newMarkers);
        };

        // 맵 생성 시 초기 마커 생성
        createMarkers();

        // 맵 이벤트 등록 및 지도 중심 변경 처리
        window.kakao.maps.event.addListener(kakaoMap, "idle", () => {
          setCenter({
            lat: kakaoMap.getCenter().getLat(),
            lng: kakaoMap.getCenter().getLng(),
          });
          setLevel(kakaoMap.getLevel());
        });
      });
    };

    document.head.appendChild(script);

    // 언마운트 시 스크립트 및 맵 정리
    return () => {
      if (script) document.head.removeChild(script);
      setMap(null);
      markers.forEach((marker) => marker.setMap(null)); // 마커들 정리
    };
  }, [mapX, mapY, level]);

  // positions 상태가 업데이트될 때마다 마커 재생성
  useEffect(() => {
    if (map) {
      const createMarkers = () => {
        markers.forEach((marker) => marker.setMap(null)); // 이전 마커 제거
        const newMarkers = positions.map((position) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(
              position.mapY,
              position.mapX
            ),
            title: position.title,
            clickable: true,
          });

          // 마커 클릭 이벤트 리스너 추가
          window.kakao.maps.event.addListener(marker, "click", () => {
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">${position.title}</div>`,
            });
            infowindow.open(map, marker); // 클릭된 마커 위에 인포윈도우 열기
          });

          return marker;
        });
        setMarkers(newMarkers); // 새로운 마커 저장
      };
      createMarkers();
    }
  }, [positions]); // positions 변경 시 실행

  return { center, level, map };
};

export default useMap;
