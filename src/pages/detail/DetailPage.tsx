import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderImg from "../../components/detail/HeaderImg";
import DetailGrid from "../../components/detail/DetailGrid";
import Review from "../../components/detail/Review";
import MoreImage from "../../components/detail/MoreImage";
import SimilarSpots from "../../components/detail/SimilarSpots";
import MenuContainer from "../../components/detail/MenuContainer";
import { home } from "../../apis/main";

export interface SpotDetailDto {
  contentId: number;
  stadiumId: number;
  name: string;
  address: string;
  isScraped: boolean;
  phoneNumber: string;
  businessHours?: string;
  closedDays?: string;
  description: string;
  parkingFacilities?: string;
  images: string[];
  checkIn?: string;
  checkOut?: string;
  homepage?: string;
  size?: string;
  items?: string;
  animalZone?: string;
  firstmenu?: string;
  treatmenu?: string;
  usefee?: string;
}

export interface SpotPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped: boolean;
  stadiumId: number;
}

const DetailPage = () => {
  const { category, contentId } = useParams();
  const [detailData, setDetailData] = useState<SpotDetailDto | null>(null);
  const [similarSpots, setSimilarSpots] = useState<SpotPreviewDto[]>([]);
  const [bookmarkStates, setBookmarkStates] = useState<{
    [key: number]: boolean;
  }>({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stadiumId = queryParams.get("stadiumId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://yaguhang.kro.kr:8443/api/spot/detail`,
          {
            params: {
              stadiumId,
              category,
              contentId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setDetailData(data);

        if (data) {
          // detailData의 isScraped 값을 초기 bookmarkStates에 반영
          setBookmarkStates((prev) => ({
            ...prev,
            [data.contentId]: data.isScraped,
          }));

          if (data.stadiumId) {
            fetchSimilarSpots(data.stadiumId);
          }
        }
      } catch (error) {
        console.error("상세 데이터 불러오기 에러:", error);
      }
    };

    const fetchSimilarSpots = async (stadiumId: number) => {
      try {
        const response = await axios.get(
          "https://yaguhang.kro.kr:8443/api/stadium",
          {
            params: {
              stadiumId,
              category,
              pagesize: 6,
              radius: 10,
            },
          }
        );

        const spotData = response.data.spotPreviewDtos;
        setSimilarSpots(spotData);

        const initialBookmarkStates = spotData.reduce(
          (acc: { [key: number]: boolean }, spot: SpotPreviewDto) => {
            acc[spot.contentId] = spot.isScraped;
            return acc;
          },
          {}
        );

        setBookmarkStates((prev) => ({ ...prev, ...initialBookmarkStates }));
      } catch (error) {
        console.error("비슷한 관광지 불러오기 에러:", error);
      }
    };

    fetchDetailData();
  }, [category, contentId]);

  useEffect(() => {
    const handleScroll = () => {
      // const sections = document.querySelectorAll("section");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBookmarkToggle = async (contentId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      toast.error("로그인이 필요합니다");
      return;
    }

    try {
      console.log("Bookmarking contentId:", contentId, "stadiumId:", stadiumId);
      await home.bookmark(contentId, Number(stadiumId));

      setBookmarkStates((prev) => ({
        ...prev,
        [contentId]: !prev[contentId],
      }));

      toast.success(
        !bookmarkStates[contentId]
          ? "스크랩에 추가되었습니다."
          : "스크랩에서 제거되었습니다."
      );
    } catch (error) {
      console.error("북마크 상태 변경 오류:", error);
      toast.error("북마크 중 오류가 발생했습니다.");
    }
  };
  const getDisplayValue = (value?: string) => {
    return value ? value : "정보 준비중";
  };

  const onClickContent = (contentId: number) => {
    navigate(`/details/${category}/${contentId}?stadiumId=${stadiumId}`);
    window.scrollTo(0, 0);
  };

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeaderImg
        imageUrl={detailData?.images[0]}
        title={detailData?.name}
        description={detailData?.description}
      />
      <MenuContainer handleScrollToSection={handleScrollToSection} />
      <Container>
        <DetailGrid
          id="details"
          category={category}
          detailData={detailData ?? undefined}
          getDisplayValue={getDisplayValue}
          bookmarkStates={bookmarkStates}
          handleBookmarkToggle={handleBookmarkToggle}
        />
        <MoreImage id="images" images={detailData?.images || []} />
        <DotLine />
        <SimilarSpots
          id="similarSpots"
          similarSpots={similarSpots}
          bookmarkStates={bookmarkStates}
          handleBookmarkToggle={handleBookmarkToggle}
          onClickContent={onClickContent}
        />
        <DotLine />
        <Review id="reviews" contentId={Number(contentId)} />
      </Container>
    </>
  );
};

export default DetailPage;

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  letter-spacing: 1px;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 45%;
`;

const DotLine = styled.div`
  width: 1250px;
  border-top: 1px dotted gray;
`;
