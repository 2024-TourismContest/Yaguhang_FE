import styled from "styled-components";

interface ButtonProps {
  onClick: () => void; // 클릭 시 실행할 함수
  text: string;
  bgColor?: string;
}
export const Button: React.FC<ButtonProps> = ({ onClick, text, bgColor }) => {
  return (
    <Wrapper>
      <StyledButton bgColor={bgColor} onClick={onClick}>
        {text}
      </StyledButton>
    </Wrapper>
  );
};

export const StyledButton = styled.button<{ bgColor?: string }>`
  background-color: #1a278e;
  font-size: 0.95em;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2px;
  border: 1.02px solid #cccccc;
  box-sizing: border-box;
  width: clamp(150px, 22vw, 237.2px);
  height: clamp(50px, 3.05vw, 100px);
  min-height: 50px;
  border-radius: 3.17vw;
  background-color: ${(props) => props.bgColor || "#1A278E"};
  margin: 5vh auto;
  display: block;
`;
export const Wrapper = styled.div`
  width: 100vw;
`;
