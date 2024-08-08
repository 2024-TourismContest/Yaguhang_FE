import Card from "../../components/home/Card";
import styled from "styled-components";
import heroImg from "../../assets/images/hero.png";
import lotteLogo from "../../assets/images/lotte_logo.svg";
import ImageSlider from "../../components/home/imageSlider";
import * as S from "../../styles/common/TitleSection";
import {StyledButton} from "../../styles/common/Button"
import marker from "../../assets/images/marker.png";

const MainContainer= styled.div`
width:100vw;
display:flex;
flex-direction:column;
align-items :center;
`

const HeroContainer = styled.div`
  height: 52.0833vh;
  display: flex;
  justify-content: space-between;
  min-width: max-content;
  background-image: url(${heroImg});
  background-size: cover;
  color: white;
  display: flex;
  padding: 15.625vw;
`;

const HeroContentWrapper = styled.div`
  min-width: max-content;
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
  font-size: 46.82pt;
  margin: 0;
  color: #828282;
  font-weight: 600;
`;

const HeroText = styled.p`
  font-size: 1.5em;
  margin-top: 100px;
  color: #828282;
  line-height: 30pt;
`;

const TeamLogo = styled.img`
  max-width: 26.0417vw;
  height: auto;
`;

const HomePage = () => {
  const HeroSection = () => (
    <HeroContainer>
      <HeroContentWrapper>
        <HeroTitle>
          자이언츠와 함께하는 <br />
          다이나믹 부산여행
        </HeroTitle>
        <HeroText>
          마! 아직도 여기 안가봤나?! <br />
          무더운 여름을 날려보낼, 다양한 여름 스포츠 패패패패키지.
        </HeroText>
      </HeroContentWrapper>
      <TeamLogo src={lotteLogo} alt="Lotte Logo" />
    </HeroContainer>
  );

  return (
    <MainContainer>
      <HeroSection />
      <Card />
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Span>
            <div>
              <S.Fan>자이언츠 팬들에게 추천하는</S.Fan>
              <S.Title>사직의 핫플레이스</S.Title>
            </div>
            <S.MarkerImg src={marker} />
          </S.Span>
          <S.H4>
            열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이 풍족하도록!
          </S.H4>
        </S.TitleWrapper>
      </S.Wrapper>
      <ImageSlider />
      <StyledButton bgColor="#1A278E">야구선수 PICK 보러가기</StyledButton>
    </MainContainer>
  );
};

export default HomePage;
