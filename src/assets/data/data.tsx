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

export const heroData = {
  "teams": [
    {
      "id": 1,
      "teamName": "롯데 자이언츠",
      "region": "부산",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/sajikStadium.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/Lotte.png",
      "heroTitle": "롯데 자이언츠와 함께하는\n부산의 매력을 느껴보세요",
      "heroText": "부산의 바다와 도시를 동시에 즐길 수 있는 패키지!\n자이언츠와 함께하는 해변 산책과 시원한 해산물 투어."
    },
    {
      "id": 2,
      "teamName": "한화 이글스",
      "region": "대전",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/hanwhaEaglesPark.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/Hanwha.png",
      "heroTitle": "한화 이글스와 함께하는\n대전의 전통과 현대를 경험하세요",
      "heroText": "대전의 역사적인 명소와 최신 랜드마크를 함께 즐길 수 있는 여행!\n이글스와 함께하는 전통 시장 탐방과 최신 테마파크 체험."
    },
    {
      "id": 3,
      "teamName": "KIA 타이거즈",
      "region": "광주",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/kiaChampionsField.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/KIA.png",
      "heroTitle": "KIA 타이거즈와 함께하는\n광주의 예술과 문화 여행",
      "heroText": "광주의 전통 문화와 현대 예술을 경험하세요!\n타이거즈와 함께하는 문화 유산 탐방과 예술 갤러리 투어."
    },
    {
      "id": 4,
      "teamName": "LG 트윈스",
      "region": "고척",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/gocheokStadium.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/LGTwins.png",
      "heroTitle": "LG 트윈스와 함께하는\n고척의 핫플레이스 탐방",
      "heroText": "고척의 최신 핫플레이스와 전통 명소를 함께 즐기세요!\nLG 트윈스와 함께하는 고척 구장 주변 명소 탐방과 인기 맛집 투어."
    },
    {
      "id": 5,
      "teamName": "두산 베어스",
      "region": "고척",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/gocheokStadium.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/Doosan.png",
      "heroTitle": "두산 베어스와 함께하는\n고척의 전통과 현대를 느끼세요",
      "heroText": "고척의 전통 명소와 현대적인 문화가 만나는 패키지!\n두산 베어스와 함께하는 전통 탐방과 최신 쇼핑 거리 체험."
    },
    {
      "id": 6,
      "teamName": "삼성 라이온즈",
      "region": "대구",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/samsungLionsPark.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/Samsung.png",
      "heroTitle": "삼성 라이온즈와 함께하는\n대구의 맛과 멋을 즐기세요",
      "heroText": "대구의 전통 시장과 맛집 투어를 즐기세요!\n삼성 라이온즈와 함께하는 대구의 유명한 먹거리와 명소 탐방."
    },
    {
      "id": 7,
      "teamName": "KT 위즈",
      "region": "수원",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/suwonStadium.jpeg",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/KtWizs.png",
      "heroTitle": "KT 위즈와 함께하는\n수원의 매력을 발견하세요",
      "heroText": "수원의 역사와 현대를 동시에 즐기세요!\nKT 위즈와 함께하는 수원 화성 탐방과 지역 맛집 체험."
    },
    {
      "id": 8,
      "teamName": "키움 히어로즈",
      "region": "고척",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/gocheokStadium.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/Kiwoom.png",
      "heroTitle": "키움 히어로즈와 함께하는\n고척의 자연과 역사 여행",
      "heroText": "고척의 아름다운 자연과 역사적 명소를 탐방하세요!\n키움 히어로즈와 함께하는 자연 산책과 역사 유적지 투어."
    },
    {
      "id": 9,
      "teamName": "SSG 랜더스",
      "region": "인천",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/incheonStadium.jpeg",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/SSGLanders.png",
      "heroTitle": "SSG 랜더스와 함께하는\n인천의 바다와 해양 스포츠",
      "heroText": "인천의 해양 스포츠와 해변을 즐기세요!\nSSG 랜더스와 함께하는 바다 탐방과 해양 액티비티."
    },
    {
      "id": 10,
      "teamName": "NC 다이노스",
      "region": "창원",
      "heroImage": "https://yaguhang.kro.kr:8443/stadiums/changwonStadium.webp",
      "teamLogo": "https://yaguhang.kro.kr:8443/teamLogos/NCDinos.png",
      "heroTitle": "NC 다이노스와 함께하는\n창원의 매력과 문화 여행",
      "heroText": "창원의 역사와 현대 문화를 동시에 즐기세요!\nNC 다이노스와 함께하는 창원 관광과 지역 특산물 체험."
    }
  ]
}