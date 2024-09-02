import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HeaderImg from "../../components/detail/HeaderImg";
import DetailGrid from "../../components/detail/DetailGrid";
import { BsBookmarkStar } from "react-icons/bs";
import Review from "../../components/detail/Review";
import MoreImage from "../../components/detail/MoreImage";
import loading from "../../assets/images/loading.svg";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stadiumId = queryParams.get("stadiumId");

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get(
          `https://yaguhang.kro.kr:8443/api/spot/detail`,
          {
            params: {
              stadiumId,
              category,
              contentId,
            },
          }
        );
        setDetailData(response.data);

        // Similar spots를 detailData를 받은후 호출
        if (response.data?.stadiumId) {
          fetchSimilarSpots(response.data.stadiumId);
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
        setSimilarSpots(response.data.spotPreviewDtos);
      } catch (error) {
        console.error("비슷한 관광지 불러오기 에러:", error);
      }
    };

    fetchDetailData();
  }, [category, contentId]);

  const getDisplayValue = (value?: string) => {
    return value ? value : "정보 준비중";
  };

  return (
    <>
      <HeaderImg
        imageUrl={detailData?.images[0]}
        title={detailData?.name}
        description={detailData?.description}
      />
      <Container>
        <DetailGrid
          category={category}
          detailData={detailData ?? undefined}
          getDisplayValue={getDisplayValue}
        />
        <MoreImage images={detailData?.images || []} />
        <DotLine />
        <Section>
          <h1>비슷한 관광지</h1>
          <SimilarSpotsContainer>
            {similarSpots.map((spot) => (
              <CardContainer key={spot.contentId}>
                <BookmarkIcon>
                  <BsBookmarkStar style={{ fontSize: "2rem" }} />
                </BookmarkIcon>
                {spot.imageUrl ? (
                  <SpotImage src={spot.imageUrl} alt={spot.name} />
                ) : (
                  <DefaultImage src={loading} alt={spot.name} />
                )}
                <LocationText>{spot.name}</LocationText>
              </CardContainer>
            ))}
          </SimilarSpotsContainer>
        </Section>
        <DotLine />
        <Review contentId={Number(contentId)} />
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

const Section = styled.div`
  position: relative;
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  flex-direction: row;
  text-align: center;
  margin-top: 8vh;

  h1 {
    color: #ffffff;
    font-size: 1.6rem;
  }
`;

const SimilarSpotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const CardContainer = styled.div`
  width: 260px; /* 카드 크기 조정 */
  height: 260px;
  background-color: #ccc;
  border-radius: 50%; /* 원형으로 변경 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 텍스트를 카드의 중앙에 위치 */
  align-items: center;
`;
const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const BookmarkIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px; /* 아이콘 크기 조정 */
  height: 65px;
  background-color: #1a278e;
  clip-path: polygon(100% 0, 100% 100%, 0 0); /* 상단 모서리에 아이콘 배치 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  padding-bottom: 45px;
  color: #fff;
`;

const SpotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const LocationText = styled.p`
  width: 150px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  text-align: center;
  position: absolute;
  bottom: 40px;
`;
