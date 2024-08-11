import styled from "styled-components";

interface WrapperProps {
  gap?: string;
}
export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: flex-start;
  gap: ${({ gap }) => gap || "30px"};
  padding-top: clamp(80px, 9.58vw, 200px);
`;
export const TitleWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
export const Title = styled.h2`
  font-size: 2.4vw;
  font-size: clamp(24px, 2.4vw, 36px);
  margin-bottom: 20px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 6px;
  margin-top: 5px;
`;
export const Fan = styled.h3`
  font-size: clamp(15px, 1.3021vw, 36px);
  margin-bottom: 50px;
  font-weight: 600;
  color: #000000;
  margin: 0;
`;
export const H4 = styled.h4`
  font-size: clamp(13.5px, 1.3vw, 24px);
  margin-bottom: 20px;
  color: #a2a2a2;
  font-weight: 400;
  margin: 0;
`;
export const MarkerImg = styled.img`
  width: 2.5vw;
  height: 3.125vw;
  position: relative;
  top: -10px;
  left: 5px;
`;
export const Span = styled.span`
  display: flex;
`;
