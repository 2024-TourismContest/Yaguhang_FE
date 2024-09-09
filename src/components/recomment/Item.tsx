import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { RecommendPreviewDto } from "../../types/recommendType";
import Share from "../detail/Share";
import { RecommendLikeButton } from "./recommendLikeButton";
export const Item = ({ item }: { item: RecommendPreviewDto }) => {
  console.log(item);
  const navigate = useNavigate();
  const onClickContent = () => {
    //상세 페이지로 이동
    navigate("/");
  };
  return (
    <Section>
      <MainImg src={item.profileImage} alt="mainImg" />
      <Span>
        <Wrapper>
          <Description>
            <li onClick={onClickContent}>{item.title}</li>
            <li>{item.stadiumName}</li>
            <li>여행 날짜 | {item.createdAt}</li>
            <li>여행 날짜 | {item.isLiked}</li>
          </Description>
          <IconWrapper>
            <li>
              <RecommendLikeButton
                contentId={item.recommendId}
                isMarked={item.isLiked}
              />
            </li>
            <li>
              <Share name={item?.title} description={item?.title} />
            </li>
          </IconWrapper>
        </Wrapper>
        <SubImgWrapper>
          <DotWrapper>
            <Dot></Dot>
            <Dot></Dot>
          </DotWrapper>
          {item.images.map((image, index) => (
            <SubImg key={index} src={image} alt={`image-${index}`} />
          ))}
        </SubImgWrapper>
      </Span>
    </Section>
  );
};

const MainImg = styled.img`
  height: 85%;
  aspect-ratio: 3/4;
  border-radius: 10%;
  @media (max-width: 1200px) {
    height: 90%;
  }
  @media (max-width: 900px) {
    height: 70%;
  }
`;
const SubImg = styled.img`
  width: 9vw;
  aspect-ratio: 1/1;
  display: flex;
  border-radius: 10%;
  @media (max-width: 1270px) {
    width: 8vw;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
const SubImgWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Description = styled.ul`
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  li {
    width: 30vw;
    @media (max-width: 900px) {
      text-align: center;
      width: 100%;
    }
  }
`;
const IconWrapper = styled.ul`
  display: flex;
  gap: 5px;
  li {
    width: 30px;
    height: 30px;
  }
  svg {
    width: 30px;
    height: 30px;
  }
`;
const Section = styled.section`
  display: flex;
  color: white;
  width: 80vw;
  height: 21vw;
  padding-bottom: 3vh;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #c8c3c3;
  @media (max-width: 1030px) {
    flex-direction: row;
    height: 30vw;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    height: 70vw;
    /* margin: 4vh 0; */
  }
`;
const Span = styled.span`
  padding: 1% 2%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 900px) {
    width: 75%;
  }
`;
const Dot = styled.div`
  background-color: white;
  width: 0.7vw;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;
const DotWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* margin-right: 10px; */
  @media (max-width: 900px) {
    display: none;
  }
`;
