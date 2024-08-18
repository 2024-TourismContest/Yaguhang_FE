// const map = () => {
//   return (
//     <>
//       <h1>map Component</h1>
//     </>
//   );
// };
// export default map;
import { useEffect, useState } from "react";
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const MapTest = () => {
  const [map, setMap] = useState(null);
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_REACT_APP_KAKAO_KEY
  }`;
  document.head.appendChild(script);
  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "inline-block",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <div id="map" style={{ width: "99%", height: "500px" }}></div>
    </div>
  );
};

export default MapTest;
