import React from "react";
import styled from "styled-components";

const BookMarkList = ({ data }) => {
  return (
    <Container>
      <Title>개강 전 부산여행</Title>
      <Row>
        //
        {data.slice(0, 3).map((stadium) => (
          <React.Fragment key={stadium.scrapStadium.stadiumId}>
            <BookMarkContainer
              img={stadium.scrapStadium.image}
              title={stadium.scrapStadium.title}
              spots={stadium.scrapSpots}
            />
            <Divider />
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
};

const BookMarkContainer = ({
  img,
  title,
  spots,
}: {
  img: string;
  title: string;
  spots: Array<{ contentId: number; image: string; title: string }>;
}) => {
  return (
    <Container>
      <ImgContainer src={img} />
      <Text>{title}</Text>
      <SpotsContainer>
        {spots.slice(0, 2).map((spot) => (
          <Spot key={spot.contentId}>
            <SpotImg src={spot.image || "/placeholder.jpg"} />
            <SpotText>{spot.title}</SpotText>
          </Spot>
        ))}
      </SpotsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ImgContainer = styled.img`
  width: 260px;
  height: 160px;
  background: white;
  object-fit: cover;
  border-radius: 8px;
`;

const Text = styled.div`
  margin-left: 10px;
  font-size: 1rem;
  color: black;
`;

const Divider = styled.div`
  width: 2px;
  height: 100%;
  background-color: #ddd;
  margin: 0 20px;
`;

const SpotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Spot = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SpotImg = styled.img`
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-right: 10px;
`;

const SpotText = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

export default BookMarkList;
