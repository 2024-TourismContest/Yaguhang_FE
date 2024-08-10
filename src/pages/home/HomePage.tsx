import Card from "../../components/home/Card";
import ImageSlider from "../../components/home/imageSlider";
import * as S from "../../styles/common/TitleSection";
import marker from "../../assets/images/marker.png";
import HeroCarousel from "./HeroCarousel";
import heroData from "../../dummy-data/dummy-hero-data.json";

const HomePage = () => {
  return (
    <>
      <HeroCarousel teams={heroData.teams} />
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
    </>
  );
};

export default HomePage;
