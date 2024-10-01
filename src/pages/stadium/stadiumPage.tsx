import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { stadium } from "../../apis/stadium";
import { teamToStadiumMap } from "../../assets/data/data";
import shopping from "../../assets/icons/Shopping_white.svg";
import ball from "../../assets/icons/baseball.svg";
import festival from "../../assets/icons/festival_white.svg";
import place from "../../assets/icons/place_whtie.svg";
import restaurant from "../../assets/icons/restaurant_white.svg";
import ImageSlider from "../../components/home/imageSlider";
import Category from "../../components/stadium/Category";
import useTeamStore from "../../store/TeamStore";
import { teamLogos } from "../../types/teamLogos";
import { TitleSection } from "./TitleSection";

type Category = "숙소" | "맛집" | "쇼핑" | "문화";

interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped: boolean;
}
interface PlaceData {
  spotPreviewDtos: SpotBasicPreviewDto[];
}

const StadiumPage = () => {
  const [placeData, setPlaceData] = useState<{ [key in Category]?: PlaceData }>(
    {}
  );
  const [playerPickData, setPlayerPickData] = useState<PlaceData | null>(null);
  const navigate = useNavigate();
  const fetchSchedules = async () => {};
  const selectedTeam = useTeamStore((state) => state.selectedTeam);
  const setSelectedTeam = useTeamStore((state) => state.setSelectedTeam);
  const teamToStadiumId = teamToStadiumMap[selectedTeam];
  const [stadiumId, setStadiumId] = useState<number>(0);

  useEffect(() => {
    if (selectedTeam === "전체" || selectedTeam === "not logined")
      setSelectedTeam("LG");
  }, []);
  const stadiumNumber = teamToStadiumMap[selectedTeam];

  const fetchPlaceData = async (category: Category) => {
    const queryParams = {
      stadiumId: stadiumNumber,
      category,
      pagesize: 4,
      pageindex: 0,
      radius: 3,
    };

    try {
      const response = await stadium.Category(queryParams);
      console.log(response)
      setPlaceData((prevData) => ({
        ...prevData,
        [category]: response.data,
      }));
    } catch (err) {
      console.error(`${category} 카테고리별 추천 에러:`, err);
    }
  };
  const fetchPlayerPickData = async (stadiumId: number) => {
    try {
      const response = await stadium.playerPick(stadiumId);
      setPlayerPickData(response.data);
    } catch (error) {
      console.error("선수픽맛집 에러", error);
    }
  };

  // 각 카테고리에 대해 데이터 로드
  useEffect(() => {
    setStadiumId(teamToStadiumId);
    fetchPlaceData("숙소");
    fetchPlaceData("맛집");
    fetchPlaceData("쇼핑");
    fetchPlaceData("문화");
    fetchPlayerPickData(stadiumNumber);
  }, [stadiumNumber]);

  const handleMoreClick = (category: string) => {
    navigate(`/category/${category}/${selectedTeam}`);
  };

  const handleImageClick = (
    contentId: number,
    stadiumId: number,
    category: string
  ) => {
    navigate(`/details/${category}/${contentId}?stadiumId=${stadiumId}`);
  };
  return (
    <>
      <div style={{ width: "100vw", height: "10vh" }}></div>
      <Category filterSchedules={fetchSchedules} teamLogos={teamLogos} />'
      <TitleSection
        title={`맛잘알 ${selectedTeam} 프로야구선수들의 맛집은?`}
        h4Text="오늘 승리하고 뒷풀이는 여기?!"
        imageSrc={ball}
        onMoreClick={() => handleMoreClick("선수PICK")}
      />
      <ImageSlider
        category="선수PICK"
        spots={playerPickData?.spotPreviewDtos || []}
        stadiumId={stadiumId}
        onImageClick={(contentId, stadiumId) =>
          handleImageClick(contentId, stadiumId, "선수PICK")
        }
      />
      <Hr />
      <TitleSection
        title="야구장 근처 숙소 추천!"
        h4Text={`내 체력도 충전해야 ${selectedTeam} 응원도 열심히 하지!`}
        imageSrc={place}
        onMoreClick={() => handleMoreClick("숙소")}
      />
      <ImageSlider
        category="숙소"
        spots={placeData["숙소"]?.spotPreviewDtos || []}
        stadiumId={stadiumId}
        onImageClick={(contentId, stadiumId) =>
          handleImageClick(contentId, stadiumId, "숙소")
        }
      />
      <Hr />
      <TitleSection
        title="야구장 근처 맛집 추천!"
        h4Text="구장 근처 맛집은 뭐가 있을까?"
        imageSrc={restaurant}
        onMoreClick={() => handleMoreClick("맛집")}
      />
      <ImageSlider
        category="맛집"
        spots={placeData["맛집"]?.spotPreviewDtos || []}
        stadiumId={stadiumId}
        onImageClick={(contentId, stadiumId) =>
          handleImageClick(contentId, stadiumId, "맛집")
        }
      />
      <Hr />
      <TitleSection
        title="야구보고 쇼핑하고!"
        h4Text="가볍게 왔다가 양손 가득 무겁게 돌아가기!"
        imageSrc={shopping}
        onMoreClick={() => handleMoreClick("쇼핑")}
      />
      <ImageSlider
        category="쇼핑"
        spots={placeData["쇼핑"]?.spotPreviewDtos || []}
        stadiumId={stadiumId}
        onImageClick={(contentId, stadiumId) =>
          handleImageClick(contentId, stadiumId, "쇼핑")
        }
      />
      <Hr />
      <TitleSection
        title="야구만큼 재밌는 문화생활!"
        h4Text="야구보러온김에 문화체험도 하고갈래?"
        imageSrc={festival}
        onMoreClick={() => handleMoreClick("문화")}
      />
      <ImageSlider
        category="문화"
        spots={placeData["문화"]?.spotPreviewDtos || []}
        stadiumId={stadiumId}
        onImageClick={(contentId, stadiumId) =>
          handleImageClick(contentId, stadiumId, "문화")
        }
      />
    </>
  );
};

export default StadiumPage;

const Hr = styled.hr`
  width: 70%;
  border-bottom: 0.3px solid #dfdfdf;
  margin-top: 30px;
  margin-bottom: 50px;
`;
