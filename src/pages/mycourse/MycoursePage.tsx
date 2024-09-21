import styled from "styled-components";
import User from "../../components/mycourse/User";
import { Filter } from "../../components/recommend/filter";
import { useState } from "react";

const MycoursePage = () => {
  const [selectedSpot, setSelectedSpot] = useState("전체");
  const handleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
  };
  return (
    <>
      <Container>
        <Title>나의 추천행 코스 만들기</Title>
        <User />
        <CategoryContainer>
          <Filter
            selectedSpot={selectedSpot}
            handleSpotChange={handleSpotChange}
          />
          <DotLine />
          <Local>부산</Local>
        </CategoryContainer>
      </Container>
    </>
  );
};
export default MycoursePage;

const Container = styled.div`
  margin-top: 15vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 5vh;
`;
const CategoryContainer = styled.div`
  max-width: 600px;
  display: flex;
  border: 1px solid #fff;
  padding: 20px 0;
`;
const DotLine = styled.div`
  width: 300px;
  border-top: 1px dotted gray;
  margin: 20px 30px;
`;

const Local = styled.div`
  width: 100px;
  max-width: 100px;
  border: 1px solid #fff;
  padding: 20px 0;
`;
