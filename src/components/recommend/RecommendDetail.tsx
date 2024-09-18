import { useEffect, useState } from "react";
import styled from "styled-components";
import { recommendDetail } from "../../apis/recommend";
import ball from "../../assets/icons/ball.svg";
import festival from "../../assets/icons/festival.svg";
import place from "../../assets/icons/place.svg";
import restaurant from "../../assets/icons/restaurant_white.svg";
import shopping from "../../assets/icons/Shopping_white.svg";
import DefaultImg from "../../assets/images/DefaultCircle.svg";
import {
  RecommendDetailResponse,
  SpotGeneralPreviewDto,
} from "../../types/recommendType";
import BookmarkIcon from "../map/BookMarkIcon";

const categoryIcons: Record<string, string> = {
  ACCOMMODATION: place,
  RESTAURANT: restaurant,
  SHOPPING: shopping,
  CULTURE_FACILITY: festival,
  ATHLETE_PICK: ball,
};
export default function RecommendDetail({
  recommendId,
  stadiumId,
}: {
  recommendId: number;
  stadiumId: number;
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
            <Img
              src={item.imageUrl ? item.imageUrl : DefaultImg}
              alt={item.name}
            />
            <Ul>
              <img
                src={
                  categoryIcons[item.category]
                    ? categoryIcons[item.category]
                    : DefaultImg
                }
                alt={`${item.category} icon`}
              />
              <Li>{item.name}</Li>
              <li>{item.address}</li>
            </Ul>
          </Div>
          <BookmarkIcon
            stadiumId={stadiumId ? stadiumId : 5}
            contentId={item.contentId}
            isMarked={item.isScraped}
          />
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
  padding: 1.2% 2%;
  height: 7vh;
  justify-content: space-between;
  align-items: center;
  button {
    width: 40px;
  }
  @media (max-width: 900px) {
    height: 15vh;
  }
`;
const Div = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;
const Img = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  @media (max-width: 900px) {
    height: 50%;
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  font-weight: 300;
  img {
    height: 40%;
    max-height: 30px;
  }
  li {
    width: 95%;
  }
`;
const Li = styled.li`
  font-weight: bold;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 70vw;
  gap: 15px;
  @media (max-width: 900px) {
    width: 85vw;
  }
`;
