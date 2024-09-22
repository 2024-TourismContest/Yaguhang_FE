import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImg from "../../assets/images/Detailnull.svg";
import { mypage } from "../../apis/mypage";
import { ScrapSpot } from "../../types/myPageType";
import SectionTitle from "../../components/common/SectionTitle";
import { Filter } from "../../components/recommend/filter";

const MyBookMark: React.FC = () => {
  const [scrapSpots, setScrapSpots] = useState<ScrapSpot[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState("전체"); 
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchScrapSpots = async () => {
    setLoading(true); 
    try {
      const myScrapSpotData = await mypage.MyBookMark(page, 100, selectedSpot);
      console.log("selected:", selectedSpot);
      console.log("response:", myScrapSpotData);
      if (myScrapSpotData.scrapSpots.length === 0) {
        setHasMore(false); // 더 이상 데이터가 없을 때
      } else {
        setScrapSpots((prev) => {
          // 중복 데이터 체크 후 새로운 데이터만 추가
          const newSpots = myScrapSpotData.scrapSpots.filter(
            (spot) =>
              !prev.some((prevSpot) => prevSpot.contentId === spot.contentId)
          );
          return [...prev, ...newSpots];
        });
      }
    } catch (error) {
      console.error("Error fetching bookmark data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScrapSpots();
  }, [page, selectedSpot]);

  // 선택 구단 바뀔 시 초기화
  useEffect(() => {
    setScrapSpots([]);
    setPage(0); 
    setHasMore(true);
  }, [selectedSpot]);

  // 무한 스크롤
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        setPage((prev) => prev + 1);
      }
    }
  };

  return (
    <Container ref={scrollRef} onScroll={handleScroll}>
      <HeaderWrapper>
        <SectionTitle
          title={"MY 북마크"}
          subtitle={"구단별로 나의 북마크를 확인하세요"}
        />
        <Filter
          handleSpotChange={setSelectedSpot}
          selectedSpot={selectedSpot}
        />
      </HeaderWrapper>

      {!loading && scrapSpots.length === 0 ? (
        <NoDataMessage>북마크가 없습니다.</NoDataMessage>
      ) : (
        <Grid>
          {scrapSpots.map((spot) => (
            <ContentWrapper key={spot.contentId}>
              <Img src={spot.image || defaultImg} alt={spot.title} />
              <Title>{spot.title}</Title>
            </ContentWrapper>
          ))}
        </Grid>
      )}

      {!hasMore && <NoDataMessage>더 이상 데이터가 없습니다.</NoDataMessage>}
    </Container>
  );
};

export default MyBookMark;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  width: 100%;
  height: 100vh;
`;

const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  width: 100%;
  gap: 20px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  );
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  flex: 1;
`;

const Img = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
  transition: 0.2s ease-in-out;
`;

const Title = styled.h2`
  max-width: 100%;
  padding-top: 0.5rem;
  text-align: center;
  font-size: 1rem;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
`;
