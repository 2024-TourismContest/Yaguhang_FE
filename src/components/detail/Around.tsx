import styled from "styled-components";

const Around = () => {
  return (
    <>
      <Section>
        <h1>주변 정보</h1>
      </Section>
      <DotLine />
    </>
  );
};
export default Around;

const Section = styled.div`
  flex: 1 1 45%;
  padding: 0rem 7rem 4rem 7rem;
  flex-direction: row;
  text-align: center;
  margin-top: 10vh;

  h1 {
    color: "#FFFFFF";
    font-size: 1.6rem;
  }
`;

const DotLine = styled.div`
  width: 1250px;
  border-top: 1px dotted gray;
`;
