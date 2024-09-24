import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultImg from "../../assets/images/defaultImg.svg";
import loadingImg from "../../assets/images/loadingImg.svg";
// import useTeamStore from "../../store/TeamStore";
import BookmarkIcon from "../map/BookMarkIcon";

export interface SpotBasicPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped: boolean;
  picker?: string;
}

interface ImageSliderProps {
  spots: SpotBasicPreviewDto[];
  category: string;
  onImageClick: (contentId: number, stadiumId: number) => void;
  stadiumId: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  spots,
  category,
  stadiumId,
}) => {
  // const stadiumId = useTeamStore((state) => state.stadiumId);
  const navigate = useNavigate();

  const handleImageClick = (contentId: number) => {
    navigate(`/details/${category}/${contentId}?stadiumId=${stadiumId}`);
    window.scrollTo(0, 0);
  };
  if (!spots || spots.length === 0)
    return (
      <Container>
        <img src={DefaultImg} alt="준비중입니다" style={{ width: "20%" }} />
      </Container>
    );

  return (
    <Container>
      <ImageWrapper>
        {spots.map((spot) => (
          <SlideContainer
            key={spot.contentId}
            onClick={() => handleImageClick(spot.contentId)}>
            <StyledMark pick={spot.picker || "none"}>
              {spot.picker ? spot.picker : ""}
            </StyledMark>
            {spot.imageUrl ? (
              <SlideImage src={spot.imageUrl} alt={spot.name} />
            ) : (
              <DefaultImage src={loadingImg} alt={spot.name} />
            )}
            <SlideInfo>
              <span>
                <SlideName>
                  {spot.name.length > 7
                    ? `${spot.name.slice(0, 7)}...`
                    : spot.name}
                </SlideName>
                <SlideAddress>
                  {spot.address.length > 10
                    ? `${spot.address.slice(0, 10)}...`
                    : spot.address}
                </SlideAddress>
              </span>
              <BookmarkIcon
                stadiumId={stadiumId ? stadiumId : 5}
                contentId={spot.contentId}
                isMarked={spot.isScraped}
              />
            </SlideInfo>
          </SlideContainer>
        ))}
      </ImageWrapper>
    </Container>
  );
};

export default ImageSlider;

const SlideContainer = styled.div`
  width: clamp(130px, 11.6vw, 370px);
  height: clamp(150px, 14.99vw, 370px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 0.9vw;
  filter: drop-shadow(0px 3.101px 3.101px rgba(0, 0, 0, 0.25));
  @media (max-width: 650px) {
    width: clamp(130px, 100%, 370px);
    height: clamp(150px, 14.99vw, 370px);
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: clamp(150px, 14.99vw, 370px);
  object-fit: cover;
  border-radius: 0.9vw;
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.9vw;
  background-color: #ffffff;
`;
const StyledMark = styled.div<{ pick: string }>`
  z-index: 5;
  position: absolute;
  width: 50%;
  top: 0;
  right: 10%;
  height: 12%;
  background: #000000;
  color: white;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  font-size: 0.85em;
  display: grid;
  place-items: center;
  visibility: ${(props) => (props.pick === "none" ? "hidden" : "visible")};
  font-weight: 600;
`;

const SlideInfo = styled.div`
  z-index: 5;
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 43%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
  color: white;
  text-align: justify;
  display: flex;
  align-items: end;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 0 0 0.9vw 0.9vw;
  justify-content: space-between;
`;

const SlideName = styled.h3`
  margin: 0;
  font-size: clamp(10px, 0.88em, 370px);
`;

const SlideAddress = styled.p`
  margin: 5px 0 0;
  font-size: clamp(6px, 0.7em, 370px);
  @media screen and (max-width: 1128px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  width: clamp(540px, 49.02vw, 900px);
  display: flex;
  align-items: center;
  gap: 1.2vw;
  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    width: clamp(200px, 80vw, 900px);
    gap: 3vw;
  }
`;

const Container = styled.div`
  max-width: 100vw;
  padding: 15px clamp(20px, 28.68vw, 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5vw;
`;
