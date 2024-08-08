import styled from "styled-components";
interface BoxProps {
    bgColor?: string; // 선택적 속성으로 배경색을 정의
  }

export const StyledButton = styled.button<BoxProps> `
    background-color : #1A278E;
    font-size:0.95em;
    color:white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 2px; 
    border: 1.02px solid #CCCCCC;
    box-sizing: border-box;
    width: clamp(150px, 22vw, 237.2px);
    height: clamp(50px, 3.05vw, 100px);
    min-height:50px;
    border-radius: 3.17vw;
    background-color: ${(props) => props.bgColor || '#1A278E'};
`