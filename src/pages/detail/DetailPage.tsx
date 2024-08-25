import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HeaderImg from "../../components/detail/HeaderImg";
import DetailGrid from "../../components/detail/DetailGrid";
import Around from "../../components/detail/Around";
import Review from "../../components/detail/Review";
import MoreImage from "../../components/detail/MoreImage";
// import MoreImage from "../../components/detail/MoreImage";

export interface SpotDetailDto {
  contentId: number;
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

const DetailPage = () => {
  const { category, contentId } = useParams();
  const [detailData, setDetailData] = useState<SpotDetailDto | null>(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get(
          `https://yaguhang.kro.kr:8443/api/spot/detail`,
          {
            params: {
              category,
              contentId,
            },
          }
        );
        setDetailData(response.data);
      } catch (error) {
        console.error("상세 데이터 불러오기 에러:", error);
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
        <Around />
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
