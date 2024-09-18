import styled from "styled-components";
import { SpotDetailDto } from "../../pages/detail/DetailPage";
import { BsBookmarkFill, BsBookmarkStar } from "react-icons/bs";
import Share from "./Share";

interface DetailGridProps {
  name: string | undefined;
  category: string | undefined;
  detailData?: SpotDetailDto;
  images?: string[];
  getDisplayValue: (value?: string) => string;
  id?: string;
  bookmarkStates: { [key: number]: boolean };
  handleBookmarkToggle: (contentId: number) => void;
}

const DetailGrid: React.FC<DetailGridProps> = ({
  category,
  detailData,
  getDisplayValue,
  id,
  bookmarkStates,
  handleBookmarkToggle,
}) => {
  return (
    <div id={id}>
      <Header>
        <Title>{detailData?.name}</Title>
        <IconContainer>
          <BookmarkIcon
            onClick={() =>
              detailData && handleBookmarkToggle(detailData.contentId)
            }
          >
            {bookmarkStates[detailData?.contentId!] ? (
              <BsBookmarkFill style={{ fontSize: "2rem" }} />
            ) : (
              <BsBookmarkStar style={{ fontSize: "2rem" }} />
            )}
          </BookmarkIcon>
          <Share
            name={detailData?.name}
            address={detailData?.address}
            description={detailData?.description}
          />
        </IconContainer>
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
              {detailData?.homepage ? (
                <StyledLink
                  href={detailData.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getDisplayValue(detailData.homepage)}
                </StyledLink>
              ) : (
                <p>{getDisplayValue(detailData?.homepage)}</p>
              )}
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
              <h2>이용료</h2>
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
          <h2>주차 시설 이용</h2>
          <p>{getDisplayValue(detailData?.parkingFacilities)}</p>
        </Box>
      </GridContainer>
      <DotLine />
    </div>
  );
};

export default DetailGrid;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  flex: 1 1 45%;
  padding: 2rem 0 1rem 7rem;

  @media (max-width: 768px) {
    height: 50px;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5625rem;
  font-weight: bold;
  margin-right: 2rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BookmarkIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 6vh;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1.25rem;
  justify-items: center;
  align-items: center;
  padding-bottom: 6vh;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;\
  }
`;

const Box = styled.div`
  width: 16.25rem;
  height: 7.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 2vh;

    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      font-size: 0.8rem;
    }
  }

  p {
    font-size: 1rem;
    margin-bottom: 2vh;
    color: #ccc;

    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      font-size: 0.7rem;
    }
  }

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    font-size: 0.5rem;
  }
`;

const Address = styled.h3`
  margin-bottom: 2vh;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1vh;
  }
`;

const Description = styled.p`
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  color: #ccc;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 1rem;
  }
`;

const Section = styled.div`
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  flex-direction: row;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Line = styled.div`
  width: 100%;
  max-width: 1250px;
  height: 1px;
  background-color: #c8c3c3;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const DotLine = styled.div`
  width: 100%;
  max-width: 1250px;
  border-top: 1px dotted gray;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
const StyledLink = styled.a`
  color: #ccc; /* 기본 링크 색상 */
  text-decoration: none;
  text-decoration: underline;

  &:hover {
    color: #1a278e; /* 호버 시 글자색 변경 */
    text-decoration: underline; /* 호버 시 밑줄 추가 (선택 사항) */
  }
`;
