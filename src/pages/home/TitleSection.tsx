import * as S from "../../styles/common/TitleSection";
import marker from "../../assets/images/marker.png";
import useTeamStore from "../../store/TeamStore";
export const TitleSection = () => {
  const selectedTeam = useTeamStore((state) => state.selectedTeam);
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Span>
          <div>
            <S.Fan>{selectedTeam} 팬들에게 추천하는</S.Fan>
            <S.Title>사직의 핫플레이스</S.Title>
          </div>
          <S.MarkerImg src={marker} />
        </S.Span>
        <S.H4>
          열정 넘치는 스포츠와 함께 즐길 추천 콘텐츠로 더욱 여행이 풍족하도록!
        </S.H4>
      </S.TitleWrapper>
    </S.Wrapper>
  );
};
