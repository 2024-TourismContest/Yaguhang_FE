import styled from "styled-components";
import SignupForm from "../../components/users/SignupForm";

const SignUpPage = () => {
  return (
    <PageContainer>
      <Title>
        {"오늘은 어떤 즐거운 일들이 \n전국 각지에서 일어나고 있을까요?"}
      </Title>
      <RowContainer>
        <WelcomeSection>
          <TextLarge as="h2">{"HELLO,\nTraveller!"}</TextLarge>
          <LineHorizontal />
          <TextMini>{"야구와 함께하는 여행은\n 처음이신가요?"}</TextMini>
        </WelcomeSection>
        <Line />
        <SignupForm />
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
  height: 100%;
  min-width: 500px;
  background-color: #000;
  padding-bottom: 200px;

  @media (max-width: 768px) {
    padding-top: 20vh;
    justify-content: center;
    align-items: center;
    height: auto;
    min-width: 0;
  }
`;

const RowContainer = styled.div`
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 7vw;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3vw;
    margin-top: 50px;
  }
`;

const Line = styled.div`
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

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-left: 50px;

  @media (max-width: 768px) {
    margin-top: 40px;
    gap: 30px;
    margin-left: 0;
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

export default SignUpPage;
