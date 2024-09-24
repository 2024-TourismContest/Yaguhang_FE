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
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
  disabled = false,
  onMouseEnter,
  onMouseLeave,
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
        disabled={disabled}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
  disabled?: boolean;
}>`
  background-color: ${(props) => props.bgColor || "#1A278E"};
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
  margin: 3vh auto;
  display: block;
  font-weight: 700;
  border: ${(props) => props.border};
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease; // 부드러운 전환 효과
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : "pointer"}; // disabled 시 커서 변경
  opacity: ${(props) => (props.disabled ? 0.6 : 1)}; // disabled 시 투명도 조절

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.bgColor || "#1A278E"
        : props.hoverBgColor || "#000000"}; // disabled 시 hover 색상 변경 없음
    color: ${(props) => props.hoverColor || "#ffffff"}; // hover 시 글자 색상
    border: ${(props) =>
      `1px solid ${
        props.disabled
          ? props.border || "#cccccc"
          : props.hoverBorderColor || "#000000"
      }`}; // hover 시 border 색상 변경
  }

  &:disabled {
    pointer-events: none; // disabled일 때 클릭 불가
  }
`;

export const Wrapper = styled.div`
  width: 100%;
`;
