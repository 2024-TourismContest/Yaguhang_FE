import styled from "styled-components";
import BookmarkIcon from "../common/BookMarkIcon";
import { ScrapSpot } from "../../types/myPageType";

interface SpotCardProps {
  spot: ScrapSpot;
  defaultImg: string;
  handleClick: (spot: ScrapSpot) => void;
  variant?: "list" | "page"; // variant prop 수정
}

const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  defaultImg,
  handleClick,
  variant = "page", // 기본값을 'page'로 설정
}) => {
  return (
    <ContentWrapper variant={variant} onClick={() => handleClick(spot)}>
      <ImgWrapper>
        <Img src={spot.image || defaultImg} alt={spot.title} />
        <Gradient />
        <TitleWrapper>
          <Title>{spot.title}</Title>
          <BookmarkIcon
            stadiumId={spot.stadiumInfo.StadiumId}
            contentId={spot.contentId}
            isMarked={true}
            width="1.25rem"
          />
        </TitleWrapper>
      </ImgWrapper>
    </ContentWrapper>
  );
};

export default SpotCard;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out; 
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s ease-in-out;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  transition: background 0.2s ease-in-out; 
`;

const ContentWrapper = styled.div<{ variant?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  /* 리스트일 때 */
  ${(props) =>
    props.variant === "list" &&
    `
      scroll-snap-align: start; 
      max-width: 230px; 
      width: 100%;
      min-width: calc((100% - 15px * (4 - 1)) / 4); 

      @media (max-width: 1100px) {
        flex: 1 0 calc(33.33% - 10px);
      }

      @media (max-width: 900px) {
        flex: 1 0 calc(50% - 10px);
      }

      @media (max-width: 400px) {
        flex: 1 0 100%;
      }
  `}

  /* 호버 시 크기 변화 및 그라디언트 효과 적용 */
  &:hover ${ImgWrapper} {
    transform: scale(1.05); 
    z-index: 1;
  }

  &:hover ${Gradient} {
    background: linear-gradient(rgba(0, 0, 0, 0.8));
    height: 100%;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 1rem;
  color: white;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
`;
