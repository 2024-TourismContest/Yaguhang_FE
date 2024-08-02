import styled from "styled-components";

interface WrapperProps {
  gap?: string;
}
export const Wrapper = styled.div<WrapperProps>`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  gap: ${({ gap }) => gap || "30px"};
  padding-left: 14.68vw;
`;
export const TitleWrapper = styled.div`
  margin-bottom: 10px;
`;
export const Title = styled.h2`
  font-size: 2.4vw;
  font-size: clamp(24px, 2.4vw, 36px);
  margin-bottom: 20px;
  font-weight: 600;
  color: white;
`;
export const H4 = styled.h4`
  font-size: 1.3vw;
  font-size: clamp(13.5px, 1.3vw, 24px);
  margin-bottom: 20px;
  color: #a2a2a2;
  font-weight: 400;
`;
