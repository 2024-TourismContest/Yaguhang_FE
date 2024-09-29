import { styled } from "styled-components";
import loadingImg from "../../assets/images/loadingImg.svg";
import usePositionsStore from "../../store/MapPositionsStore";

export const MapPosition = ({
  onClickContent,
}: {
  onClickContent: (contentId: number, stadiumId: number) => void;
}) => {
  const positions = usePositionsStore((state) => state.positions);
  return (
    <Container>
      <ItemList>
        {positions.map((position, index) => (
          <ItemWrapper
            key={index}
            onClick={() => {
              // console.log("Position stadiumId:", position.stadiumId);
              onClickContent(position.contentId, position.stadiumId);
            }}
          >
            <Img
              src={position.image ? position.image : loadingImg}
              alt={position.title}
            />
            <TextWrapper>
              <H3>{position.title}</H3>
              <H4>{position.address}</H4>
              <H5>리뷰 {position.reviewCount}</H5>
            </TextWrapper>
          </ItemWrapper>
        ))}
      </ItemList>
    </Container>
  );
};

export const Container = styled.div`
  width: 100vw;
  display: flex;
  font-family: Arial;
  margin-bottom: 25vh;
`;
export const ItemList = styled.div`
  width: 65vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
`;
export const ItemWrapper = styled.div`
  width: 18vw;
  height: 21.3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Img = styled.img`
  width: 100%;
  height: 60%;
  object-fit: fill;
  border-radius: 1.0417vw;
  background-color: #ffffff;
`;
export const H3 = styled.h3`
  color: white;
  font-size: 1.2em;
  width: 100%;
  text-overflow: ellipsis;
`;
export const H4 = styled.h4`
  color: white;
  font-size: 0.9em;
`;
export const H5 = styled.h5`
  color: white;
  font-size: 0.8em;
`;
export const TextWrapper = styled.div`
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 90%;
`;
