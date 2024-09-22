import styled from "styled-components";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  color?: "white" | "black";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  color = "white",
}) => {
  return (
    <Container>
      <Title color={color}>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Container>
  );
};

export default SectionTitle;

const Container = styled.div`
  gap: 10px;
`;

const Title = styled.h1<{ color: "white" | "black" }>`
  color: ${(props) => (props.color === "white" ? "#fff" : "#000")};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  transition: 0.2s ease-in-out;
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SubTitle = styled.h2`
  color: #bfbfbf;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: 0.2s ease-in-out;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
