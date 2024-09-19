import React from "react";
import styled from "styled-components";
import plus from "../../assets/icons/plus.svg";
import defaultImg from "../../assets/images/Detailnull.svg";

interface Spot {
  contentId: number | string;
  image: string;
  title: string;
}

interface Stadium {
  scrapStadium: {
    stadiumId: number;
    image: string;
    title: string;
  };
  scrapSpots: Spot[];
}

interface BookMarkListProps {
  data: Stadium[];
}

const BookMarkList: React.FC<BookMarkListProps> = ({ data }) => {
  return (
    <Container>
      {data.slice(0, 3).map((stadium) => (
        <Row key={stadium.scrapStadium.stadiumId}>
          <BookMarkContainer
            img={stadium.scrapStadium.image}
            title={stadium.scrapStadium.title}
            spots={stadium.scrapSpots}
          />
        </Row>
      ))}
    </Container>
  );
};

interface BookMarkContainerProps {
  img: string;
  title: string;
  spots: Spot[];
}

const BookMarkContainer: React.FC<BookMarkContainerProps> = ({
  img,
  title,
  spots,
}) => {
  const spotsToShow = spots.slice(0, 3);
  const spotsCount = spots.length;

  return (
    <BookmarkContent>
      <ContentWrapper>
        <Img src={img} alt={title} />
        <Title>{title}</Title>
      </ContentWrapper>
      <Divider>
        <Dot />
        <Dot />
      </Divider>
      <SpotsContainer>
        {spotsToShow.map((spot) => (
          <ContentWrapper key={spot.contentId}>
            <Img src={spot.image || defaultImg} alt={spot.title} />
            <Title>{spot.title}</Title>
          </ContentWrapper>
        ))}
        {spotsCount < 3 &&
          Array.from({ length: 3 - spotsCount }).map((_, index) => (
            <ContentWrapper key={`placeholder-${index}`}>
              <AddContainer>
                <img src={plus} alt="Add more" />
              </AddContainer>
            </ContentWrapper>
          ))}
      </SpotsContainer>
    </BookmarkContent>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

const BookmarkContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h2`
  width: 100%;
  padding-top: 0.5rem;
  text-align: center;
  font-size: 1rem;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SpotsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

const AddContainer = styled.div`
  width: 100%;
  height: 130px;
  border: 1px dashed #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50px;
  }
`;

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  margin: 4px 0;
`;

export default BookMarkList;
