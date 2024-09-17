import { useEffect, useState } from "react";
import styled from "styled-components";
import { recommendDetail } from "../../apis/recommend";
import DefaultImg from "../../assets/images/DefaultCircle.svg";
import {
  RecommendDetailResponse,
  SpotGeneralPreviewDto,
} from "../../types/recommendType";
export default function RecommendDetail({
  recommendId,
}: {
  recommendId: number;
}) {
  const [res, setRes] = useState<SpotGeneralPreviewDto[]>();
  const getRecommendList = async () => {
    try {
      const response: RecommendDetailResponse = await recommendDetail(
        recommendId
      );
      console.log(response);
      setRes(response.spotGeneralPreviewDtos);
    } catch (error) {
      console.log("에러");
    }
  };
  useEffect(() => {
    getRecommendList();
  }, []);
  if (!res) return;
  return (
    <Section>
      {res.map((item) => (
        <Span key={item.contentId}>
          <Div>
            <img
              src={item.imageUrl ? item.imageUrl : DefaultImg}
              alt={item.name}
            />
            <Ul>
              <li>{item.name}</li>
              <Li>{item.name}</Li> {/* 실제 데이터를 넣어야 함 */}
              <li>{item.address}</li>
            </Ul>
          </Div>
          {/* <BookmarkIcon
                stadiumId={item.stadiumId ? item.stadiumId : 5}
                contentId={item.contentId}
                isMarked={item.isScraped}
              /> */}
        </Span>
      ))}
    </Section>
  );
}

const Span = styled.span`
  color: white;
  display: flex;
  border: 1px solid white;
  border-radius: 0.4em;
  padding: 1.2% 4%;
  height: 7vh;
  justify-content: space-between;
  align-items: center;
`;
const Div = styled.div`
  display: flex;
  height: 100%;
  img {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
`;
const Li = styled.li`
  font-weight: bold;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
