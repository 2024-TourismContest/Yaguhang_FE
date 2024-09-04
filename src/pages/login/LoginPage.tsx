import LoginForm from "../../components/users/LoginForm";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <PageContainer>
      <Title>{"오늘은 어떤 즐거운 일들이 \n전국 각지에서 일어나고 있을까요?"}</Title>
      <RowContainer>
        <LeftContainer>
          <TextLarge>{"HELLO,\nTraveller!"}</TextLarge>
          <LineHorizontal />
          <TextMini>{"야구와 함께하는 여행은\n 처음이신가요?"}</TextMini>
          <SubmitBtn>SIGN UP</SubmitBtn>
        </LeftContainer>
        <LineVertical />
        <LoginForm />
      </RowContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10vh;
  height: 100vh;
  min-width: 500px;
  background-color: #000;

  @media (max-width: 768px) {
    padding-top: 20vh;
    min-width: 100vw;
  }
`;

const RowContainer = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 7vw;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    gap: 3vh;
  }
`;

const LineVertical = styled.div`
  width: 1px;
  height: 100%;
  background: #fff;

  @media (max-width: 768px) {
    width: 70%;
    height: 1px;
    margin-bottom: 3vh;
  }
`;

const LineHorizontal = styled.div`
  width: 70px;
  height: 7px;
  border-radius: 4px;
  border: 1px solid #fff;
  background: #acabab;

  @media (max-width: 768px) {
    width: 50px;
    height: 5px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 80px;

  @media (max-width: 768px) {
    gap: 30px;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 23.921px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const TextLarge = styled.span`
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 2.58em;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const TextMini = styled.p`
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 1em;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 0.875em;
  }
`;

const SubmitBtn = styled.button`
  padding: 0.75em 2.5em;
  border-radius: 1.5625em;
  background: #000;
  border: 1px solid #fff;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1.6875em;
  font-weight: 400;
  cursor: pointer;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 0.5em 2em;
    font-size: 1.5rem;
  }
`;

export default LoginPage;