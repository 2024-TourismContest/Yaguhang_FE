import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { recommendDetail } from "../../apis/recommend";
import DefaultImg from "../../assets/images/DefaultCircle.svg";
import {
  RecommendDetailResponse,
  SpotGeneralPreviewDto,
} from "../../types/recommendType";
import BookmarkIcon from "../common/BookMarkIcon";

export default function RecommendDetail({
  recommendId,
  stadiumId,
}: {
  recommendId: number;
  stadiumId: number;
}) {
  const navigate = useNavigate();
  const onClickContent = (
    category: string,
    contentId: number,
    stadiumId: number
  ) => {
    navigate(`/details/${category}/${contentId}?stadiumId=${stadiumId}`);
  };
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
        <Span
          key={item.contentId}
          onClick={() =>
            onClickContent(item.category, item.contentId, stadiumId)
          }
        >
          <Div>
            <Img
              src={item.imageUrl ? item.imageUrl : DefaultImg}
              alt={item.name}
            />
            <Ul>
              <img src={item.categoryUrl} alt={`${item.category} icon`} />
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
  height: 12vh;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  svg {
    width: 25px;
  }
  button {
    width: 40px;
  }
  height: 12vh;
  min-height: 100px;
`;
const Div = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 100%;
`;
const Img = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 900px) {
    height: 50%;
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  font-weight: 300;
  width: 100%;
  img {
    width: 1.4rem;
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
  min-width: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 1.5vh 0;
  width: 60vw;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
