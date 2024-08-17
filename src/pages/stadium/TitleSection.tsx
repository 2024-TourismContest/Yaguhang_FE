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
    <Wrapper gap="30%">
      <S.Span>
        {imageSrc && <Img src={imageSrc} alt="Dynamic Image" />}
        <S.TitleWrapper>
          <Title>{title}</Title>
          <S.H4>{h4Text}</S.H4>
        </S.TitleWrapper>
      </S.Span>
      <MoreButton onClick={onMoreClick}>
        more <HiPlus />
      </MoreButton>
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
  height: 100%;
  margin-right: 15px;
`;

export const Title = styled.h2`
  font-size: clamp(24px, 2.4em, 30px);
  margin-bottom: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
  margin-top: 5px;
`;
export const Wrapper = styled.div<{ gap?: string }>`
  /* width: 100vw; */
  display: flex;
  justify-content: flex-start;
  gap: ${({ gap }) => gap || "30px"};
  padding-left: 14.68vw;
  padding-top: 50px;
  align-items: center;
  box-sizing: border-box;
`;
