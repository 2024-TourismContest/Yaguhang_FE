import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface HeroData {
  teams: {
    id: number;
    heroImage: string;
    heroTitle: string;
    heroText: string;
    teamLogo: string;
  }[];
}

const HeroCarousel: React.FC<HeroData> = ({ teams }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    autoplaySpeed: 2800,
    arrows: false, 
  };

  return (
    <Slider {...settings}>
      {teams.map((team) => (
        <HeroCarouselItem
          key={team.id}
          heroImage={team.heroImage}
          heroTitle={team.heroTitle}
          heroText={team.heroText}
          teamLogo={team.teamLogo}
          altText={ 'Team Logo' }
        />
      ))}
    </Slider>
  );
};

interface HeroSectionProps {
  key: string;
  heroImage: string;
  heroTitle: string;
  heroText: string;
  teamLogo: string;
  altText: string;
}

const HeroCarouselItem: React.FC<HeroSectionProps> = ({
  key,
  heroImage,
  heroTitle,
  heroText,
  teamLogo,
  altText,
}) => {
  const navigate = useNavigate();
  const handleClickBtn = () => {
    navigate(`/${key}`);
  };
  return (
    <HeroContainer heroImage={heroImage}>
      <Wrapper>
        <HeroContentWrapper>
          <HeroTitle>{heroTitle}</HeroTitle>
          <HeroText>{heroText}</HeroText>
        </HeroContentWrapper>
        <TeamLogoContainer>
          <TeamLogo src={teamLogo} alt={altText} />
        </TeamLogoContainer>
      </Wrapper>
      <Button onClick={handleClickBtn}> 보러가기 </Button>
    </HeroContainer>
  );
};

const HeroContainer = styled.div<{ heroImage: string }>`
  height: 52.0833vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.heroImage});
  background-size: cover;
  color: white;
  padding: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: max-content;
`;

const HeroContentWrapper = styled.div`
  min-width: max-content;
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
  font-size: 46.82pt;
  font-weight: 600;
  white-space: pre-line;
`;

const HeroText = styled.p`
  font-size: 1.5em;
  margin-top: 200px;
  line-height: 30pt;
  white-space: pre-line;
`;

const TeamLogoContainer = styled.div`
  max-width: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TeamLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 비율 유지하며 자르지 않고 포함됨 */
`;
const Button = styled.button`
  border-radius: 10px;
  padding: 10px 30px;
  margin-top: 100px;
  font-size: 1.5em;
  font-weight: 700;
  color: #6a6a6a;
  border: none;
  cursor: pointer;
`;

export default HeroCarousel;
