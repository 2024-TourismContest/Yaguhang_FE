import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderImg from "../../components/detail/HeaderImg";
import DetailGrid from "../../components/detail/DetailGrid";

import MoreImage from "../../components/detail/MoreImage";
import SimilarSpots from "../../components/detail/SimilarSpots";
import MenuContainer from "../../components/detail/MenuContainer";
import { home } from "../../apis/main";
import Review from "../../components/Review/Review";

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
  picker?: string;
  buisnessHours?: string;
}

export interface SpotPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped: boolean;
  stadiumId: number;
  category: string;
}

const DetailPage = () => {
  const { category, contentId } = useParams<{
    category: string;
    contentId: string;
  }>();

  const numericContentId = contentId ? parseInt(contentId, 10) : null;

  if (!numericContentId) {
    console.log("유효하지 않은 contentId입니다");
  }

  const [detailData, setDetailData] = useState<SpotDetailDto | null>(null);
  const [stadiumId, setStadiumId] = useState<number | null>(null); // stadiumId 상태
  const [similarSpots, setSimilarSpots] = useState<SpotPreviewDto[]>([]);
  const [bookmarkStates, setBookmarkStates] = useState<{
    [key: number]: boolean;
  }>({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const stadiumIdParam = queryParams.get("stadiumId");
    if (stadiumIdParam) {
      setStadiumId(Number(stadiumIdParam));
    }

    const fetchDetailData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://yaguhang.kro.kr:8443/api/spot/detail`,
          {
            params: {
              stadiumId: stadiumIdParam, // URL에서 가져온 stadiumId 사용
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

        // 북마크 상태 업데이트
        if (data) {
          setBookmarkStates((prev) => ({
            ...prev,
            [data.contentId]: data.isScraped,
          }));

          if (data.stadiumId) {
            fetchSimilarSpots(data.stadiumId); // stadiumId를 이용해 비슷한 관광지 로드
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
              category: category === "선수PICK" ? "맛집" : category,
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
  }, [category, contentId, location.search]);

  const handleBookmarkToggle = async (contentId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      toast.error("로그인이 필요합니다");
      return;
    }

    try {
      await home.bookmark(contentId, Number(stadiumId)); // stadiumId가 URL에서 추출된 상태를 사용

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

  const onClickContent = (category: string, contentId: number) => {
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
          name={detailData?.name}
          category={category}
          detailData={detailData ?? undefined}
          getDisplayValue={getDisplayValue}
          bookmarkStates={bookmarkStates}
          handleBookmarkToggle={handleBookmarkToggle}
        />
        <MoreImage id="images" images={detailData?.images || []} />
        <DotLine />
        <SimilarSpots
          name={detailData?.name ?? ""}
          id="similarSpots"
          similarSpots={similarSpots}
          bookmarkStates={bookmarkStates}
          handleBookmarkToggle={handleBookmarkToggle}
          onClickContent={onClickContent}
        />
        <DotLine />
        {numericContentId && stadiumId && (
          <Review
            id="reviews"
            contentId={numericContentId}
            stadiumId={stadiumId}
          />
        )}
      </Container>
    </>
  );
};

export default DetailPage;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  letter-spacing: 1px;
`;

const DotLine = styled.div`
  width: 100%;
  max-width: 1100px;
  border-top: 1px dotted gray;
  margin: 20px 0;
`;
