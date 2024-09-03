import { toast } from "react-toastify";
import styled from "styled-components";
import { FiShare } from "react-icons/fi";
import { SpotDetailDto } from "../../pages/detail/DetailPage";
import { BsBookmarkFill, BsBookmarkStar } from "react-icons/bs";

interface DetailGridProps {
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
  const handleShare = (detailData: SpotDetailDto) => {
    if (navigator.share) {
      navigator
        .share({
          title: detailData?.name,
          text: detailData?.description,
          url: window.location.href,
        })
        .catch((error) => console.error("공유하기 에러:", error));
    } else {
      toast("공유하기 기능을 지원하지 않는 브라우저입니다.");
    }
  };

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
          <ShareIcon onClick={() => detailData && handleShare(detailData)}>
            <FiShare />
          </ShareIcon>
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
`;

const Title = styled.h1`
  font-size: 1.5625rem; /* 25px */
  font-weight: bold;
  margin-right: 2rem;
  flex-grow: 1;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ShareIcon = styled.div`
  font-size: 1.5rem; /* 24px */
  cursor: pointer;
`;

const BookmarkIcon = styled.div`
  font-size: 1.5rem; /* 24px */
  cursor: pointer;
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 7vh;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1.25rem;
  justify-items: center;
  align-items: center;
  padding-bottom: 6vh;
`;

const Box = styled.div`
  width: 16.25rem;
  height: 7.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const DotLine = styled.div`
  width: 1250px;
  border-top: 1px dotted gray;
`;
