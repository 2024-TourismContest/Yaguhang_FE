import { TbMapSearch } from "react-icons/tb";
import styled from "styled-components";
import * as S from "../../styles/common/TitleSection";

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
        <StyledDiv>
          <TitleWrapper>
            <Title>{title}</Title>
            <S.H4>{h4Text}</S.H4>
          </TitleWrapper>
          <MoreButton onClick={onMoreClick}>
            지도로 보기 <TbMapSearch />
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
  padding: 5px 16px;
  border: none;
  font-size: 1.2em;
  gap: 15px;
  font-weight: 400;
  svg {
    height: 35px;
    width: 35px;

    &:hover {
      color: #0056b3;
    }
  }
  @media screen and (max-width: 600px) {
    svg {
      height: 20px;
      width: 20px;
    }
    gap: 5px;
    font-size: 1.05em;
  }
`;
const Img = styled.img`
  height: 45px;
  position: relative;
  right: 15px;
  svg {
    stroke: white;
    color: white;
    background: #fff;
  }
  @media screen and (max-width: 1050px) {
    height: 4vw;
  }
  @media screen and (max-width: 600px) {
    left: 2px;
    height: 25px;
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
  @media (max-width: 650px) {
    width: 100vw;
  }
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
  @media screen and (max-width: 600px) {
    gap: 0px;
    width: clamp(200px, 95vw, 900px);
  }
`;
export const Span = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;
