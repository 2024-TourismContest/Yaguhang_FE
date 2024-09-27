import { useEffect, useState } from "react";
import usePositionStore from "../../store/MapPositionStore";
import { Position } from "./map";
type MapCenter = {
  lat: number;
  lng: number;
};

const useMap = (mapX: number, mapY: number, positions: Position[]) => {
  const clearPosition = usePositionStore((state) => state.clearPosition);
  const [map, setMap] = useState(null);
  const [level, setLevel] = useState<number>(8);
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

  useEffect(() => {
    clearPosition();
    if (map) {
      const createMarkers = () => {
        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));

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

          // 커스텀 오버레이 내용 정의
          const customOverlayContent = `
            <div style="
              padding: 10px;
              background: white;
              border-radius: 5px;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
              text-align: center;
              white-space: nowrap;
              font-size: 14px;
              color: black;
            ">
              ${position.title}
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content: customOverlayContent,
            position: marker.getPosition(),
            xAnchor: 0.5,
            yAnchor: 2.1,
            zIndex: 3,
            clickable: true,
          });
          let hideOverlayTimeout: NodeJS.Timeout | null = null;
          let lastExecutionTime = 0; // 마지막 실행 시간을 저장할 변수

          // 마우스 오버 시 오버레이 표시 (5초 동안 다시 실행되지 않도록 설정)
          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            const currentTime = new Date().getTime(); // 현재 시간
            if (currentTime - lastExecutionTime < 1500) {
              return; // 마지막 실행으로부터 5초가 지나지 않았으면 실행하지 않음
            }

            lastExecutionTime = currentTime; // 마지막 실행 시간 업데이트

            if (hideOverlayTimeout) {
              clearTimeout(hideOverlayTimeout); // 이전 타임아웃 취소
            }
            customOverlay.setMap(map); // 오버레이 표시
          });

          // 마우스 아웃 시 오버레이를 약간의 지연 후 제거
          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            hideOverlayTimeout = setTimeout(() => {
              customOverlay.setMap(null); // 오버레이 제거
            }, 500);
          });

          // 마커 클릭 시 위치 설정
          window.kakao.maps.event.addListener(marker, "click", () => {
            setPosition(position);
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
