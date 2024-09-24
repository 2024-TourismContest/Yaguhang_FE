import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import useTeamStore from "../../store/TeamStore";

interface HeroData {
  teams: {
    id: number;
    heroImage: string;
    heroTitle: string;
    heroText: string;
    teamLogo: string;
    teamName: string;
    region: string;
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
    pauseOnHover: false,
  };
  // 모바일
  const mobileSettings = {
    ...settings,
    vertical: false,
  };
  const isMobile = window.innerWidth <= 768;

  return (
    <StyledSlider {...(isMobile ? mobileSettings : settings)}>
      {teams.map((team) => (
        <HeroCarouselItem
          key={team.id}
          heroImage={team.heroImage}
          heroTitle={team.heroTitle}
          heroText={team.heroText}
          teamLogo={team.teamLogo}
          altText={"Team Logo"}
          teamName={team.teamName}
          region={team.region}
        />
      ))}
    </StyledSlider>
  );
};

interface HeroSectionProps {
  heroImage: string;
  heroTitle: string;
  heroText: string;
  teamLogo: string;
  altText: string;
  teamName: string;
  region: string;
}

const HeroCarouselItem: React.FC<HeroSectionProps> = ({
  heroImage,
  heroTitle,
  heroText,
  teamLogo,
  altText,
  teamName,
  region,
}) => {
  const navigate = useNavigate();
  const { setSelectedTeam } = useTeamStore();
  const handleClickBtn = () => {
    setSelectedTeam(teamName.split(" ")[0]);
    navigate(`/stadium`);
    console.log(teamName.split(" ")[0]);
  };

  const renderStyledText = (title: string) => {
    const parts = title.split(new RegExp(`(${region}|${teamName})`, "g"));
    return (
      <>
        {parts.map((part, index) => {
          if ([region, teamName].includes(part)) {
            return <StyledLargeText key={index}>{part}</StyledLargeText>;
          }
          return <StyledNormalText key={index}>{part}</StyledNormalText>;
        })}
      </>
    );
  };

  return (
    <HeroContainer heroImage={heroImage}>
      <RowWrapper>
        <ContentWrapper>
          <HeroTitle>{renderStyledText(heroTitle)}</HeroTitle>
          <HeroText>{heroText}</HeroText>
          <Button onClick={handleClickBtn}>{`관광지 보러가기 >`}</Button>
        </ContentWrapper>
        <TeamLogo src={teamLogo} alt={altText} />
      </RowWrapper>
    </HeroContainer>
  );
};

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-dots {
    position: absolute;
    bottom: -3vh;
    width: 100%;
    display: flex !important;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .slick-dots li {
    margin: 0 5px;
  }

  .slick-dots li button {
    display: block;
    width: 9px;
    height: 9px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }

  .slick-dots li button:before {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 9px;
    height: 9px;
    content: "";
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .slick-dots li.slick-active button:before {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const HeroContainer = styled.div<{ heroImage: string }>`
  width: 100vw;
  height: calc(100vw * 9 / 16);
  position: relative;
  background: url(${(props) => props.heroImage}) no-repeat center center;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgb(0, 0, 0) 100%
    );
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 97vh;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 100px;
    padding: 0 2%;
    align-items: center;
    justify-content: center;
  }
`;

const ContentWrapper = styled.div`
  min-width: fit-content;
  margin-right: 10%;
  margin-top: 30%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10vh;
    margin-right: 0;
  }
`;
const HeroTitle = styled.h1`
  white-space: pre-line;
  font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem);
  text-align: left;
  margin-bottom: clamp(1rem, 2vw, 3rem);

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StyledLargeText = styled.span`
  color: #fff;
  font-family: Inter;
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  font-weight: 600;
`;

const StyledNormalText = styled.span`
  color: #fff;
  font-family: Inter;
  font-size: clamp(1.4rem, 1.5vw + 1rem, 1.8rem);
  font-weight: 400;
`;

const HeroText = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: clamp(1rem, 1.2vw + 0.8rem, 1.125rem);
  white-space: pre-line;
  line-height: 120%;

  @media (max-width: 768px) {
    text-align: center;
  }
`;
const TeamLogo = styled.img`
  max-width: 260px;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const Button = styled.button`
  width: fit-content;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px #d9d9d9 solid;
  background: #ca0000;
  color: #fff;
  font-family: Inter;
  font-size: 1rem;

  margin-top: 10%;
  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

export default HeroCarousel;
