//정적 데이터 모아놓는 폴더
export const stadiumMap: Record<number, { name: string; team: string }> = {
  1: { name: "잠실", team: "LG 트윈스" },
  2: { name: "수원", team: "KT 위즈" },
  3: { name: "창원", team: "NC 다이노스" },
  4: { name: "광주", team: "KIA 타이거즈" },
  5: { name: "사직", team: "롯데 자이언츠" },
  6: { name: "대구", team: "삼성 라이온즈" },
  7: { name: "대전", team: "한화 이글스" },
  8: { name: "고척", team: "키움 히어로즈" },
  9: { name: "문학", team: "SSG 랜더스" },
  10: { name: "잠실", team: "두산 베어스" },
  49: { name: "울산", team: "롯데 자이언츠" },
  50: { name: "포항", team: "삼성 라이온즈" },
  51: { name: "청주", team: "한화 이글스" },
};
export const club: Record<number, { name: string; team: string }> = {
  1: { name: "잠실", team: "LG" },
  2: { name: "수원", team: "KT" },
  3: { name: "창원", team: "NC" },
  4: { name: "광주", team: "KIA" },
  5: { name: "사직", team: "롯데" },
  6: { name: "대구", team: "삼성" },
  7: { name: "대전", team: "한화" },
  8: { name: "고척", team: "키움" },
  9: { name: "문학", team: "SSG" },
  10: { name: "잠실", team: "두산" },
};

export const clubImg: Record<number, { name: string; teamLogos: string }> = {
  1: {
    name: "잠실",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/LGTwins.png",
  },
  2: {
    name: "수원",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/KtWizs.png",
  },
  3: {
    name: "창원",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/NCDinos.png",
  },
  4: {
    name: "광주",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/KIA.png",
  },
  5: {
    name: "사직",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/Lotte.png",
  },
  6: {
    name: "대구",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/Samsung.png",
  },
  7: {
    name: "대전",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/Hanwha.png",
  },
  8: {
    name: "고척",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/Kiwoom.png",
  },
  9: {
    name: "문학",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/SSGLanders.png",
  },
  10: {
    name: "잠실",
    teamLogos: "https://yaguhang.kro.kr:8443/teamLogos/Doosan.png",
  },
  0: {
    name: "전체",
    teamLogos: "",
  },
};

export const teamToStadiumMap: Record<string, number> = Object.entries(
  club
).reduce((acc, [number, { team }]) => {
  acc[team] = Number(number);
  return acc;
}, {} as Record<string, number>);

export const teamToStadiumImg: Record<string, string> = Object.entries(
  clubImg
).reduce((acc, [, { name, teamLogos }]) => {
  acc[name] = teamLogos;
  return acc;
}, {} as Record<string, string>);
