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

export const teamToStadiumMap: Record<string, number> = Object.entries(
  club
).reduce((acc, [number, { team }]) => {
  acc[team] = Number(number);
  return acc;
}, {} as Record<string, number>);
