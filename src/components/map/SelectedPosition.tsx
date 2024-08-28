import { styled } from "styled-components";
// 여기서 올바른 store 경로로 수정
import loadingImg from "../../assets/images/loadingImg.svg";
import usePositionStore from "../../store/MapPositionStore";

export const SelectedPosition = () => {
  const position = usePositionStore((state) => state.position); // 단일 position 객체 가져오기

  if (!position) {
    return <div></div>; // position이 없을 때의 처리
  }

  return (
    <Wrapper>
      <P>부산광역시</P>
      <Container>
        <ItemWrapper>
          <section>
            <Img
              src={position.image ? position.image : loadingImg}
              alt={position.title}
            />
            <Box>
              <TextWrapper>
                <H3>{position.title}</H3>
                <H4>{position.address}</H4>
              </TextWrapper>
              <A href="/상세보기">자세히 보러가기</A>
            </Box>
          </section>
          <Ul>
            <li>리뷰 {position.reviewCount}</li>
            <li>스크랩 별</li>
          </Ul>
        </ItemWrapper>
      </Container>
    </Wrapper>
  );
};

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
export const P = styled.p`
  color: white;
  width: 65vw;
  font-size: 1.8em;
  padding-left: 3%;
  box-sizing: border-box;
`;
export const ItemList = styled.div`
  width: 65vw;
`;
export const ItemWrapper = styled.div`
  width: 60vw;
  height: 21.3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  section {
    display: flex;
    height: 70%;
    justify-content: center;
    align-items: center;
    gap: 5%;
  }
`;
export const Img = styled.img`
  width: 35%;
  border-radius: 1.0417vw;
  background-color: #d9d9d9;
`;
export const H3 = styled.h3`
  color: white;
  font-size: 1.3em;
`;
export const H4 = styled.h4`
  color: white;
  font-size: 0.9em;
`;
export const H5 = styled.h5`
  color: white;
  font-size: 0.8em;
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const Ul = styled.ul`
  color: white;
  display: flex;
  gap: 5px;
  margin: 0;
  height: 50%;
  flex-shrink: 0;
`;
export const A = styled.a`
  color: white;
`;
export const Box = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 5% 0;
  justify-content: space-between;
  box-sizing: border-box;
  flex-grow: 1;
`;
