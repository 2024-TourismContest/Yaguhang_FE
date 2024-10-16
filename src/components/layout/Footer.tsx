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
          <FooterText>email: yaguhang@gmail.com</FooterText>
        </HorizontalInfo>
        <FooterText>© 2024 yaguhang. All rights reserved.</FooterText>
      </TextWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #101b52;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;
const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const HorizontalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Separator = styled.span`
  color: rgba(255, 255, 255, 0.6);
`;

const FaqLink = styled(Link)`
  color: #ffffff;
  font-size: 0.9rem;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
