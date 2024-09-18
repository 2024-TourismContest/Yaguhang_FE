import styled from "styled-components";

interface ButtonProps {
  onClick: () => void; // 클릭 시 실행할 함수
  text: string;
  bgColor?: string;
  color?: string;
  fontWeight?: string;
}
export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  bgColor,
  color,
  fontWeight,
}) => {
  return (
    <Wrapper>
      <StyledButton bgColor={bgColor} color={color} onClick={onClick}>
        {text}
      </StyledButton>
    </Wrapper>
  );
};

export const StyledButton = styled.button<{
  bgColor?: string;
  color?: string;
  fontWeight?: string;
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
`;
export const Wrapper = styled.div`
  width: 100%;
`;
