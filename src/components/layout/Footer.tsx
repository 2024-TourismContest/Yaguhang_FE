import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <FooterContainer>
      <LogoImg src={logo} alt="야구행 로고" />
      <TextWrapper>
        <FooterText>야구행</FooterText>
        <HorizontalInfo>
          <FaqLink to="/faq">자주 묻는 질문(FAQ)</FaqLink>
          <Separator>|</Separator>
          <FooterText>email: gd10080008@pukyong.ac.kr</FooterText>
        </HorizontalInfo>
        <FooterText>© 2024 yaguhang. All rights reserved.</FooterText>
      </TextWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #193590;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoImg = styled.img`
  width: 80px;
  height: 80px;
`;

const TextWrapper = styled.div`
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const FooterText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const HorizontalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Separator = styled.span`
  margin: 0 0.5rem;
`;

const FaqLink = styled(Link)`
  color: white;
  font-size: 1rem;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;
