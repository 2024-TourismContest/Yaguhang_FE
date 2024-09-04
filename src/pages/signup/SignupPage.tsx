import styled from "styled-components";
import SignupForm from "../../components/users/SignupForm";

const SignUpPage = () => {
  return (
    <PageContainer>
      <Title>
        {"오늘은 어떤 즐거운 일들이 \n전국 각지에서 일어나고 있을까요?"}
      </Title>
      <RowContainer>
        <LeftContainer>
          <TextLarge as="h2">{"HELLO,\nTraveller!"}</TextLarge>
          <LineHorizontal />
          <TextMini>{"야구와 함께하는 여행은\n 처음이신가요?"}</TextMini>
        </LeftContainer>
        <LineVertical />
        <SignUpContainer>
          <SignupForm />
        </SignUpContainer>
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
    padding-top: 5vh;
    height: auto;
  }
`;

const RowContainer = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 7vw;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3vw;
    margin-top: 50px;
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  gap: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const LineVertical = styled.div`
  width: 1px;
  height: 100%;
  background: #fff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LineHorizontal = styled.div`
  width: 70px;
  height: 7px;
  border-radius: 4px;
  border: 1px solid #fff;
  background: #acabab;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 40px;
    gap: 30px;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const TextLarge = styled.h2`
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 2.58rem;
  font-weight: 500;
  line-height: normal;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TextMini = styled.p`
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 0.875rem;
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
  font-size: 1.6875rem;
  font-weight: 400;
  cursor: pointer;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 0.5em 2em;
    font-size: 1.5rem;
  }
`;
export default SignUpPage;