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
  background-color: #0056b3;
  height: 50px;
  color: white;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 15px;
  border: none;
  font-size: 1em;
  gap: 12px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  svg {
    height: 25px;
    width: 25px;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  &:hover {
    background-color: #004b9c;
    transform: translateY(-2px);
    svg {
      transform: scale(1.2);
    }
  }

  @media screen and (max-width: 500px) {
    font-size: 0.8em;
    padding: 3px 5px;
    height: 30px;
    width: 85px;
    gap: 5px;
    svg {
      height: 20px;
      width: 30px;
    }
  }
`;

const Img = styled.img`
  height: 45px;
  position: relative;
  right: 15px;

  @media screen and (max-width: 1050px) {
    height: 4vw;
  }
  @media screen and (max-width: 600px) {
    height: 25px;
    left: 2px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(12px, 2.4em, 25px);
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
  padding: 20px 0 30px 0;
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
