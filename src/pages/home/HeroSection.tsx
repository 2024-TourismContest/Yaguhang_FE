import styled from 'styled-components';

const HeroContainer = styled.div`
  height: 52.0833vh;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url(${(props) => props.heroImage});
  background-size: cover;
  color: white;
  padding: 15.6250vw;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: max-content;
`

const HeroContentWrapper = styled.div`
  min-width: max-content;
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
  font-size: 46.82pt;
  margin: 0;
  font-weight: 600;
  white-space: pre-line; 

`;

const HeroText = styled.p`
  font-size: 1.5em;
  margin-top: 100px;
  line-height: 30pt;
  white-space: pre-line; 
`;

const TeamLogo = styled.img`
  max-width: 26.0417vw;
  height: auto;
`;

const HeroSection = ({ heroImage, heroTitle, heroText, teamLogo, altText }) => (
  <HeroContainer heroImage={heroImage}>
    <Wrapper>
    <HeroContentWrapper>
      <HeroTitle>{heroTitle}</HeroTitle>
      <HeroText>{heroText}</HeroText>
    </HeroContentWrapper>
    <TeamLogo src={teamLogo} alt={altText} />
    </Wrapper>
  </HeroContainer>
);

export default HeroSection;