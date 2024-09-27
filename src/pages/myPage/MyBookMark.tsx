import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import defaultImg from "../../assets/images/Detailnull.svg";
import { mypage } from "../../apis/mypage";
import { ScrapSpot } from "../../types/myPageType";
import SectionTitle from "../../components/common/SectionTitle";
import { Filter } from "../../components/recommend/filter";
import { useNavigate } from "react-router-dom";
import { NoDataMessage } from "../../styles/common/messageStyle";
import SpotCard from "../../components/myPage/SpotCard";

const MyBookMark: React.FC = () => {
  const [scrapSpots, setScrapSpots] = useState<ScrapSpot[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState("전체");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchScrapSpots = async () => {
    setLoading(true);
    try {
      const myScrapSpotData = await mypage.MyBookMark(page, 100, selectedSpot);
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

  const handleClick = (spot: ScrapSpot) => {
    const url = `/details/${spot.category}/${spot.contentId}?stadiumId=${spot.stadiumInfo.StadiumId}`;
    navigate(url);
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
            <SpotCard
              key={spot.contentId}
              spot={spot}
              defaultImg={defaultImg}
              handleClick={handleClick}
            />
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
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 30px;
  display: grid;
  width: 100%;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); /* 최소 230px, 카드 간 간격 조정 */
`;
