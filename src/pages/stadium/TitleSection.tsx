import * as S from "../../styles/common/TitleSection";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";

interface TitleSectionProps {
  title: string;
  h4Text: string;
  imageSrc?: string;
  onMoreClick: () => void; // 버튼 클릭 시 실행될 함수
}

export const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  h4Text,
  imageSrc,
  onMoreClick,
}) => {
  return (
    <Wrapper>
      <Span>
        {imageSrc && <Img src={imageSrc} alt="Dynamic Image" />}
        <StyledDiv gap="30%">
          <TitleWrapper>
            <Title>{title}</Title>
            <S.H4>{h4Text}</S.H4>
          </TitleWrapper>
          <MoreButton onClick={onMoreClick}>
            more <HiPlus />
          </MoreButton>
        </StyledDiv>
      </Span>
    </Wrapper>
  );
};

const MoreButton = styled.button`
  background-color: transparent;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  font-size: 1.25em;
  gap: 15px;
  font-weight: 400;
  svg {
    height: 35px;
    width: 35px;
  }
`;
const Img = styled.img`
  height: 45px;
  position: relative;
  right: 15px;
  @media screen and (max-width: 1050px) {
    height: 4vw;
  }
`;

export const Title = styled.h2`
  font-size: clamp(12px, 2.4em, 30px);
  margin-bottom: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
  margin-top: 5px;

  @media screen and (max-width: 1050px) {
    font-size: clamp(10px, 4.5vw, 24px);
  }
`;
export const Wrapper = styled.div<{ gap?: string }>`
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: ${({ gap }) => gap || "30px"};
  padding: 50px 0 30px 0;
  align-items: center;
  box-sizing: border-box;
`;
export const TitleWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
`;
export const StyledDiv = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${({ gap }) => gap || "30px"};
  justify-content: space-between;
  width: clamp(540px, 60vw, 900px);
`;
export const Span = styled.span`
  display: flex;
  align-items: center;
  position: relative;
`;
