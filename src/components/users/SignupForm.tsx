import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../input/InputWithLabel"; // Import the InputWithLabel component

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Example async operation; replace with actual signup logic
      // const response = await signup.signup(email, password);
      // console.log(response);
      navigate("/users/login");
    } catch (err) {
      setError("로그인에 실패했습니다.");
    }
  };

  return (
    <FormContainer>
      <Title>회원가입</Title>
      <ProfileSection>
        <ProfileImg />
        <ProfileText>프로필 이미지</ProfileText>
      </ProfileSection>
      <form onSubmit={handleSubmit}>
        <InputWithLabel
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithLabel
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputWithLabel
          label="Nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitBtn type="submit">SIGN UP</SubmitBtn>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  width: 100%; /* 전체 너비 사용 */
  padding: 2rem;
  box-sizing: border-box;
`;
const Title = styled.h1`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.75rem;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  margin-bottom: 1rem;
`;

const ProfileText = styled.span`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  text-align: center;
`;

const SubmitBtn = styled.button`
  padding: 0.75em 2.5em;
  border-radius: 1.5625em;
  background: #fff;
  border: none;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 1.6875em;
  font-weight: 400;
  cursor: pointer;
  margin-top: 1.5em;
  @media (max-width: 768px) {
    padding: 0.5em 2em;
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6262;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  margin-top: 1em;
`;

export default SignupForm;