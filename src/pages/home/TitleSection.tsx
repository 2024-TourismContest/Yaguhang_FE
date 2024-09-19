import * as S from "../../styles/common/TitleSection";
import marker from "../../assets/images/marker.png";

interface TitleSectionProps {
  subtitle?: string;
  title: string;
  description: string;
  icon?: 'marker';
}

export const TitleSection: React.FC<TitleSectionProps> = ({
  subtitle,
  title,
  description,
  icon,
}) => {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Span>
          <div>
            <S.Fan>{subtitle}</S.Fan>
            <S.Title>{title}</S.Title>
          </div>
          {icon === 'marker' && <S.MarkerImg src={marker} />}
        </S.Span>a
        <S.H4>{description}</S.H4>
      </S.TitleWrapper>
    </S.Wrapper>
  );
};