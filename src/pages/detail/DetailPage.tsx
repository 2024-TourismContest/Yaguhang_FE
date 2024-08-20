import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HeaderImg from "../../components/detail/HeaderImg";
import DetailGrid from "./DetailGrid";

interface SpotDetailDto {
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
    return value && value.trim() !== "" ? value : "-";
  };

  return (
    <>
      <HeaderImg
        imageUrl={detailData?.images[0]}
        title={detailData?.name}
        description={detailData?.description}
      />
      <Container>
        <Content>
          <Section>
            <Title>{detailData?.name}</Title>
            <Address>{detailData?.address}</Address>
            <Description>{detailData?.description}</Description>
          </Section>
          <Section>
            <DetailGrid
              category={category}
              detailData={detailData}
              getDisplayValue={getDisplayValue}
            />
          </Section>
        </Content>
      </Container>
    </>
  );
};

export default DetailPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  letter-spacing: 1px;
`;

const Content = styled.div`
  gap: 20px;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 1.5625rem; /* 25px */
  margin-bottom: 2vh;
  font-weight: bold;
`;

const Address = styled.h3`
  margin-bottom: 2vh;
  font-size: 1.25rem; /* 20px */
`;

const Description = styled.p`
  margin-bottom: 1.25rem; /* 20px */
  font-size: 1.125rem; /* 18px */
`;

const Section = styled.div`
  flex: 1 1 45%;
  padding: 3.125rem; /* 50px */
  border-bottom: 1px solid #ffffff;
  flex-direction: row;
`;
