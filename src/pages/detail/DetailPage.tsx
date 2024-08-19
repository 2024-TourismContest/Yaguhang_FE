import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HeaderImg from "../../components/detail/HeaderImg";

interface SpotDetailDto {
  contentId: number;
  name: string;
  address: string;
  isScraped: boolean;
  phoneNumber: string;
  businessHours: string;
  closedDays: string;
  description: string;
  parkingFacilities: string;
  images: string[];
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
            <h2>상세소개</h2>
            <p>{detailData?.description}</p>
          </Section>
          <Section>
            <h2>운영시간</h2>
            <p>{detailData?.businessHours}</p>
          </Section>
          <Section>
            <h2>문의 및 전화</h2>
            <p>{detailData?.phoneNumber}</p>
          </Section>
          <Section>
            <h2>웹사이트</h2>
            {/* <a href={detailData?.website}>{detailData?.website}</a> */}
          </Section>
          <Section>
            <h2>이용요금</h2>
            {/* <p>{detailData?.fees}</p> */}
          </Section>
          <Section>
            <h2>애완동물 동반여부</h2>
            {/* <p>{detailData?.petFriendly ? "가능" : "불가능"}</p> */}
          </Section>
          <Section>
            <h2>주차시설 및 편의시설</h2>
            <p>{detailData?.parkingFacilities}</p>
          </Section>
        </Content>
        {/* <ReviewSection>
        <h2>야구행 리뷰</h2>
        <ReviewInput placeholder="여기를 클릭해서 리뷰를 입력하세요. (최대 300자)" />
       <ReviewList>리뷰</ReviewList>
      </ReviewSection> */}
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
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const Section = styled.div`
  flex: 1 1 45%;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 5px;
  h2 {
    margin-top: 0;
  }
`;

// const ReviewSection = styled.div`
//   margin-top: 40px;
// `;

// const ReviewInput = styled.textarea`
//   width: 100%;
//   height: 100px;
//   padding: 10px;
//   border-radius: 5px;
//   border: none;
//   resize: none;
// `;

// const ReviewList = styled.div`
//   margin-top: 20px;
//   /* 리뷰 리스트 스타일 */
// `;
