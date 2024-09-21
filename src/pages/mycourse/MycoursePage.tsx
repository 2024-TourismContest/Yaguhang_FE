import styled from "styled-components";
import User from "../../components/mycourse/User";
import { Filter } from "../../components/recommend/filter";
import { useState } from "react";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const MycoursePage = () => {
  const [selectedSpot, setSelectedSpot] = useState("전체");
  const handleSpotChange = (spot: string) => {
    setSelectedSpot(spot);
  };
  const navigate = useNavigate();

  const handleButtonClick = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <>
      <Container>
        <Title>
          <Emoji>⛳️</Emoji> 나의 <Highlight>추천행</Highlight> 코스 만들기
        </Title>
        <User />
        <CategoryContainer>
          <FilterWrapper>
            <Filter
              selectedSpot={selectedSpot}
              handleSpotChange={handleSpotChange}
            />
          </FilterWrapper>
          <DotLineContainer>
            <DotLine />
            <Dot />
          </DotLineContainer>
          <Local>{selectedSpot}</Local>
        </CategoryContainer>
        <Button
          bgColor="#000"
          border="2px solid #fff"
          color="#fff"
          text="나의 추천행 코스 생성하기 >"
          fontWeight="bold"
          hoverColor="#a7cfec"
          hoverBorderColor="#a7cfec"
          onClick={() => handleButtonClick("RecommendPage")}
        />
      </Container>
    </>
  );
};

export default MycoursePage;

const Container = styled.div`
  width: 100%;
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100vh;
  margin: 0 auto;
  margin-top: -120px;
`;
const Title = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 7vh;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
`;

const Emoji = styled.span`
  font-size: 2.5rem;
  position: relative;
  top: 5px;
`;

const Highlight = styled.span`
  color: #83c7ff;
  text-decoration: underline;
`;

const CategoryContainer = styled.div`
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotLineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 20px;
`;

const DotLine = styled.div`
  width: 400px;
  border-top: 1px dashed gray;
`;

const Dot = styled.div`
  position: absolute;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
`;

const Local = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  padding: 10px 20px;
`;
