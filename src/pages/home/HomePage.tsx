import Slider from "react-slick";
import styled from "styled-components";
import heroData from "./dummydata.json"; // 더미 데이터 파일 경로를 확인하세요
import HeroSection from "./HeroSection"; // HeroSection 컴포넌트 import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dot: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  vertical: true,
  autoplaySpeed: 2500
};

const HomePage = () => {
  return (
    <Slider {...settings}>
      {heroData.teams.map((team) => (
        <HeroSection
          key={team.id}
          heroImage={team.heroImage}
          heroTitle={team.heroTitle}
          heroText={team.heroText}
          teamLogo={team.teamLogo}
          altText={`${team.name} Logo`}
        />
      ))}
    </Slider>
  );
};

export default HomePage;