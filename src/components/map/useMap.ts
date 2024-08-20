import { useEffect, useState } from "react";

type MapCenter = {
  lat: number;
  lng: number;
};

const useMap = (mapX: number, mapY: number) => {
  const [map, setMap] = useState(null);
  const [level, getLevel] = useState<number>(5);
  const [center, setCenter] = useState<MapCenter>({ lat: mapY, lng: mapX });
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

        // 맵 생성 후 상태에 저장
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);

        // 맵 이벤트 등록
        window.kakao.maps.event.addListener(kakaoMap, "idle", () => {
          setCenter({
            lat: kakaoMap.getCenter().getLat(),
            lng: kakaoMap.getCenter().getLng(),
          });
          getLevel(kakaoMap.getLevel());
        });
      });
    };

    document.head.appendChild(script);

    // 언마운트 시 스크립트 및 맵 정리
    return () => {
      if (script) document.head.removeChild(script);
      setMap(null); // 맵 초기화
    };
  }, [mapX, mapY, level]);

  return { center, level, map };
};

export default useMap;
