import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { home } from "../../apis/main";
import { Button } from "../../components/button/Button";
import Card from "../../components/home/Card";
import { CategorySelector } from "../../components/home/CategorySelector";
import HeroCarousel from "../../components/home/HeroCarousel";
import ImageSlider from "../../components/home/imageSlider";
import WeatherCard from "../../components/home/WeatherCard";
import WeatherGraph from "../../components/home/WeatherGraph";
import { heroData } from "../../assets/data/data";
// import heroData from "../../dummy-data/dummy-hero-data.json";
import useTeamStore from "../../store/TeamStore";
import { TitleSection } from "./TitleSection";
import useModalStore from "../../store/modalStore";

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

const HomePage = () => {
  const stadium = useTeamStore((state) => state.selectedGame?.stadium);
  const [selectedCategory, setSelectedCategory] = useState<string>("숙소");
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [stadiumId, setStadiumId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { selectedGame, selectedTeam, setSelectedTeam } = useTeamStore();
  const { openModal, closeModal } = useModalStore();
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkFanTeamStatus = async () => {
      try {
        const status = await home.checkFanTeam();
        if (status === "Check") {
          const showModalOnHome = localStorage.getItem(
            "showFanTeamModalOnHome"
          );
          if (showModalOnHome) {
            localStorage.removeItem("showFanTeamModalOnHome");
            openModal({
              title: "팀 등록",
              content:
                "팬 구단이 등록되어 있지 않습니다. 팀을 등록하시겠습니까?",
              onConfirm: () => {
                navigate("/mypage");
                closeModal();
              },
              showCancel: true,
              showDoNotShowAgain: true,
              onDoNotShowAgain: handleDoNotShowAgain,
            });
          }
        } else if (typeof status === "string" && status !== "No Check") {
          setSelectedTeam(status);
          console.log("status:", status);
        }
      } catch (error) {
        console.error("Error checking fan team:", error);
      }
    };

    if (!isInitialCheckDone) {
      checkFanTeamStatus();
      setIsInitialCheckDone(true);
    }
  }, [isInitialCheckDone, setSelectedTeam, openModal]); // Include openModal

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await home.place(
          stadium ? stadium : "사직",
          selectedCategory
        );
        setPlaceData(response.data);
        setStadiumId(response.data.stadiumId);
      } catch (err) {
        console.error("카테고리별추천 에러:", err);
      }
    };
    fetchPlaceData();
  }, [selectedCategory, stadium]);

  const handleButtonClick = (page: string) => {
    navigate(`/${page}`);
  };

  const handleImageClick = (contentId: number, stadiumId: number) => {
    if (stadiumId) {
      navigate(
        `/details/${selectedCategory}/${contentId}?stadiumId=${stadiumId}`
      );
    }
  };

  const handleDoNotShowAgain = async (doNotShowAgain: boolean) => {
    try {
      if (doNotShowAgain) {
        await home.setDoNotShowAgain();
      }
    } catch (error) {
      console.error("Error setting 'Do not show again':", error);
    }
  };

  return (
    <>
      <HeroCarousel teams={heroData.teams} />
      <HomePageContainer className="home-page">
        <RoundBackground />
        <Card />
        <Button
          text="MY 야구공 스탬프 모아보기 "
          onClick={() => handleButtonClick("mypage")}
          bgColor="#FF0000"
        />
        <TitleSection
          subtitle={`${selectedTeam} 팬들에게 추천하는`}
          title={`${selectedGame?.stadium || "구장"}의 핫플레이스!`}
          description="열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이 풍족하도록!"
          icon="marker"
        />
        <CategorySelector
          category={selectedCategory}
          setCategory={setSelectedCategory}
          color="black"
          categoryList={["숙소", "맛집", "쇼핑", "문화"]}
        />
        <ImageSlider
          category={selectedCategory}
          spots={placeData?.spotPreviewDtos || []}
          stadiumId={stadiumId!}
          onImageClick={handleImageClick}
        />
        <Button
          text="야구선수 PICK 보러가기"
          onClick={() => handleButtonClick("stadium")}
        />
        {selectedGame?.id && (
          <>
            <TitleSection
              title="현재 잠실구장의 날씨는?"
              description="오늘은 비가 안와야 할텐데.."
            />
            <WeatherContainer>
              <WeatherCard gameId={selectedGame.id} />
              <WeatherGraph gameId={selectedGame.id} />
            </WeatherContainer>
          </>
        )}
      </HomePageContainer>
    </>
  );
};

const HomePageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  justify-content: center;
  z-index: 1;
`;

const RoundBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2700px;
  height: 1500px;
  background-color: #000000;
  border-radius: 46%;
  transform: translate(-50%, -30%);
  z-index: -1;

  @media (max-width: 768px) {
    width: 300vw;
    height: 1200px;
    transform: translate(-50%, -20%);
    z-index: -1;
  }
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  gap: 4vw;
  margin: 60px auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 50px;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 0 4vw;
  }
`;

export default HomePage;
