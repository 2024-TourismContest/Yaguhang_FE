import React from "react";
import styled from "styled-components";

interface DetailGridProps {
  category: string | undefined;
  detailData: any;
  getDisplayValue: (value?: string) => string;
}

const DetailGrid: React.FC<DetailGridProps> = ({
  category,
  detailData,
  getDisplayValue,
}) => {
  return (
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
  );
};

export default DetailGrid;

const GridContainer = styled.div`
  display: grid;
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
