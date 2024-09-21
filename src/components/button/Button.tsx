import styled from "styled-components";

interface ButtonProps {
  onClick: () => void; // 클릭 시 실행할 함수
  text: string;
  bgColor?: string;
  color?: string;
  fontWeight?: string;
  className?: string;
  border?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  hoverBorderColor?: string;
}
export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  bgColor,
  color,
  border,
  hoverBgColor,
  hoverColor,
  hoverBorderColor,
}) => {
  return (
    <Wrapper>
      <StyledButton
        bgColor={bgColor}
        color={color}
        onClick={onClick}
        border={border}
        hoverBgColor={hoverBgColor}
        hoverColor={hoverColor}
        hoverBorderColor={hoverBorderColor}
      >
        {text}
      </StyledButton>
    </Wrapper>
  );
};

export const StyledButton = styled.button<{
  bgColor?: string;
  color?: string;
  className?: string;
  border?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  hoverBorderColor?: string;
}>`
  background-color: #1a278e;
  font-size: 0.95em;
  color: ${(props) => props.color || "#ffffff"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2px;
  border: 1.02px solid #cccccc;
  box-sizing: border-box;
  width: clamp(210px, 22vw, 237.2px);
  height: clamp(50px, 3.05vw, 63px);
  min-height: 50px;
  border-radius: clamp(50px, 3.17vw, 237.2px);
  background-color: ${(props) => props.bgColor || "#1A278E"};
  margin: 3vh auto;
  display: block;
  font-weight: 700;
  border: ${(props) => props.border};
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease; // 부드러운 전환 효과

  &:hover {
    background-color: ${(props) =>
      props.hoverBgColor || "#000000"}; // hover 시 배경 색상
    color: ${(props) => props.hoverColor || "#ffffff"}; // hover 시 글자 색상
    border: ${(props) =>
      `1px solid ${
        props.hoverBorderColor || "#000000"
      }`}; // hover 시 border 색상 변경
  }
`;
export const Wrapper = styled.div`
  width: 100%;
`;
