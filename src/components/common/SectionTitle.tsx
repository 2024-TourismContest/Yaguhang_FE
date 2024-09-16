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
  font-size: 2.24069rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubTitle = styled.h2`
  color: #bfbfbf;
  font-family: Inter;
  font-size: 1.43969rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
