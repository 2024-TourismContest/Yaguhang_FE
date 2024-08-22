import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FiShare } from "react-icons/fi";

interface DetailGridProps {
  category: string | undefined;
  detailData?: any;
  getDisplayValue: (value?: string) => string;
}

const handleShare = (detailData: any) => {
  // 공유하기 기능 구현
  if (navigator.share) {
    navigator
      .share({
        title: detailData?.name,
        text: detailData?.description,
        url: window.location.href,
      })
      .catch((error) => console.error("공유하기 에러:", error));
  } else {
    // 공유 API를 지원하지 않는 경우 다른 방법으로 처리
    toast("공유하기 기능을 지원하지 않는 브라우저입니다.");
  }
};

const DetailGrid: React.FC<DetailGridProps> = ({
  category,
  detailData,
  getDisplayValue,
}) => {
  return (
    <>
      <Header>
        <Title>{detailData?.name}</Title>
        <ShareIcon onClick={() => handleShare(detailData)}>
          <FiShare />
        </ShareIcon>
      </Header>
      <Section>
        <Address>{detailData?.address}</Address>
        <Description>{detailData?.description}</Description>
      </Section>
      <Line />
      <GridContainer>
        {category === "숙소" && (
          <>
            <Box>
              <h2>체크인</h2>
              <p>{getDisplayValue(detailData?.checkIn)}</p>
            </Box>
            <Box>
              <h2>체크아웃</h2>
              <p>{getDisplayValue(detailData?.checkOut)}</p>
            </Box>
            <Box>
              <h2>홈페이지</h2>
              <p>{getDisplayValue(detailData?.homepage)}</p>
            </Box>
            <Box>
              <h2>크기</h2>
              <p>{getDisplayValue(detailData?.size)}</p>
            </Box>
          </>
        )}
        {category === "맛집" && (
          <>
            <Box>
              <h2>운영시간</h2>
              <p>{getDisplayValue(detailData?.businessHours)}</p>
            </Box>
            <Box>
              <h2>휴무일</h2>
              <p>{getDisplayValue(detailData?.closedDays)}</p>
            </Box>
            <Box>
              <h2>대표 메뉴</h2>
              <p>{getDisplayValue(detailData?.firstmenu)}</p>
            </Box>
            <Box>
              <h2>취급 메뉴</h2>
              <p>{getDisplayValue(detailData?.treatmenu)}</p>
            </Box>
          </>
        )}
        {category === "쇼핑" && (
          <>
            <Box>
              <h2>운영시간</h2>
              <p>{getDisplayValue(detailData?.businessHours)}</p>
            </Box>
            <Box>
              <h2>휴무일</h2>
              <p>{getDisplayValue(detailData?.closedDays)}</p>
            </Box>
            <Box>
              <h2>판매 품목</h2>
              <p>{getDisplayValue(detailData?.items)}</p>
            </Box>
            <Box>
              <h2>애완동물 동반</h2>
              <p>{getDisplayValue(detailData?.animalZone)}</p>
            </Box>
          </>
        )}
        {category === "문화" && (
          <>
            <Box>
              <h2>운영시간</h2>
              <p>{getDisplayValue(detailData?.businessHours)}</p>
            </Box>
            <Box>
              <h2>휴무일</h2>
              <p>{getDisplayValue(detailData?.closedDays)}</p>
            </Box>
            <Box>
              <h2>이용로</h2>
              <p>{getDisplayValue(detailData?.usefee)}</p>
            </Box>
            <Box>
              <h2>애완동물 동반</h2>
              <p>{getDisplayValue(detailData?.animalZone)}</p>
            </Box>
          </>
        )}
        <Box>
          <h2>문의 및 전화</h2>
          <p>{getDisplayValue(detailData?.phoneNumber)}</p>
        </Box>
        <Box>
          <h2>포장 여부</h2>
          <p>{getDisplayValue(detailData?.parkingFacilities)}</p>
        </Box>
      </GridContainer>
      <Line />
    </>
  );
};

export default DetailGrid;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  flex: 1 1 45%;
  padding: 2rem 0 1rem 7rem;
`;

const Title = styled.h1`
  font-size: 1.5625rem; /* 25px */
  font-weight: bold;
  margin-right: 2rem;
`;

const ShareIcon = styled.div`
  font-size: 1.5rem; /* 24px */
  cursor: pointer;
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 7vh;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1.25rem; /* 20px */
`;

const Box = styled.div`
  max-width: 16.25rem; /* 260px */
  height: 7.5rem; /* 120px */
  text-align: center;

  h2 {
    font-weight: bold;
    margin-bottom: 2vh;
  }
`;

const Address = styled.h3`
  margin-bottom: 2vh; /* 10px */
  font-size: 1.25rem; /* 20px */
`;

const Description = styled.p`
  margin-bottom: 1.25rem; /* 20px */
  font-size: 1.125rem; /* 18px */
`;

const Section = styled.div`
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  flex-direction: row;
`;

const Line = styled.div`
  width: 1250px;
  height: 1px;
  background-color: #c8c3c3;
`;
