import styled from "styled-components";

const LoginForm = () => {
  return (
    <FormContainer>
      <Title>로그인</Title>
      <KaKaoButton>카카오톡으로 계속하기</KaKaoButton>
      <Line />
      <InputContainer>
        <Input placeholder="ID" />
        <Input placeholder="Password" type="password" />
        <LinkText href="#">비밀번호를 잃어버렸나요?</LinkText>
      </InputContainer>
      <SubmitBtn>LOGIN</SubmitBtn>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  height: 500px;
`;

const Title = styled.h1`
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.75rem;
`;

const KaKaoButton = styled.button`
  padding: 1em 1.5em;
  width: 23em;
  border-radius: 0.933rem;
  background-color: #ffdb1c;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: 1.04rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  margin-bottom: 1em;
`;

const Line = styled.div`
  width: 23em;
  height: 0.5px;
  background-color: #fff;
  margin: 1em 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 23em;
`;

const Input = styled.input`
  padding: 1em 1.5em;
  border-radius: 0.933rem;
  border: 0.3px solid #fff;
  background-color: #000;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 1.04rem;
  font-weight: 400;
  text-align: left;
`;

const LinkText = styled.a`
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
`;

const SubmitBtn = styled.button`
  padding: 0.75em 2.5em;
  border-radius: 1.5625em;
  background: #fff;
  border:none;
  color: #000;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1.6875em;
  font-weight: 400;
  cursor: pointer;
  margin-top: auto;
`;


export default LoginForm;