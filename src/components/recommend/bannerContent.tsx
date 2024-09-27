import { styled } from "styled-components";

export default function BannerContent() {
  return (
    <Span>
      <Box>
        <ul>
          <Dot></Dot>
          <Dot></Dot>
        </ul>
        <H1>
          나만의 여행루트를 다른 사람들과 공유해보고 <br />더 새로운 여행을 위한
          추천행 코스를 만들어보자!
        </H1>
      </Box>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </Span>
  );
}
const Dot = styled.div`
  border-radius: 50%;
  background-color: #ffffff;
  width: 7px;
  height: 7px;
  border: 1px solid black;
`;
const Span = styled.span`
  position: absolute;
  z-index: 10;
  top: 20%;
  right: 10%;
`;
const Box = styled.div`
  display: flex;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;
const H1 = styled.h1`
  -webkit-text-stroke: 1px #1b1464;
  color: white;

  font-size: 1.2em;
  font-weight: #1b1464;
`;
