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
    teamName: string;
    region: string;
  }[];
}

// 캐러셀
const HeroCarousel: React.FC<HeroData> = ({ teams }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    autoplaySpeed: 3000,
    arrows: false, 
    pauseOnHover: false
  };

  return (
    <StyledSlider {...settings}>
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

  // 버튼
  const handleClickBtn = () => {
    navigate(`/${teamName}`);
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
        <div>
          <HeroTextContainer>
            <HeroTitle>{renderStyledText(heroTitle)}</HeroTitle>
            <HeroText>{heroText}</HeroText>
          </HeroTextContainer>
          <Button onClick={handleClickBtn}>{`관광지 보러가기 >`}</Button>
        </div>
        <TeamLogo src={teamLogo} alt={altText} />
      </RowWrapper>
    </HeroContainer>
  );
};
const StyledSlider = styled(Slider)`
  margin-bottom: 10vh;
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
    content: '';
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .slick-dots li.slick-active button:before {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const HeroContainer = styled.div<{ heroImage: string }>`
  position: relative;
  height: 56.8125rem;
  background: url(${(props) => props.heroImage}) no-repeat center center;
  background-size: cover;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.857) 0%, 
      rgba(0, 0, 0, 0.5) 20%,
      rgba(0, 0, 0, 0.3) 50%, 
      rgba(0, 0, 0, 0.7) 80%,
      rgb(0, 0, 0) 100%
    );
    z-index: 1;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 11vw;
  padding-right: 17.8283vw;
  align-items: center;
`;

const HeroTextContainer = styled.div`
  padding-top: 30.7071vw;
  display: flex;
  flex-direction: column;
  gap: 0.84vh;
  padding-bottom: 3vw;
`;

const HeroTitle = styled.h1`
  white-space: pre-line;
`;

const StyledLargeText = styled.span`
  color: #fff;
  font-family: Inter;
  font-size: 3.40744rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledNormalText = styled.span`
  color: #fff;
  font-family: Inter;
  font-size: 2.47713rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HeroText = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TeamLogo = styled.img`
  width: 17.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Button = styled.button`
  width: fit-content;
  padding: 0.94rem 1.74em;
  justify-content: center;
  align-items: center;
  border-radius: 0.57963rem;
  border: 1px #d9d9d9 solid;
  background: #ca0000;

  color: #fff;
  font-family: Inter;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
`;

export default HeroCarousel;