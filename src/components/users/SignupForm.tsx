import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../input/InputWithLabel";
import { accounts } from "../../apis/auth";
import ProfileEditSection from "../profile/ProfileEditSection";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      email,
      password,
      nickname,
      phoneNumber,
      profileImage,
    };

    try {
      await accounts.signup(formData);
      navigate("/login");
    } catch (err) {
      setError("회원가입에 실패했습니다.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // 이미지 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormContainer>
      <Title>회원가입</Title>
      <FormWrapper>
        <ProfileEditSection
          profileImage={profileImage}
          onImageChange={handleImageChange}
        />
        <Form onSubmit={handleSubmit}>
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
          <InputWithLabel
            label="Phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormWrapper>
      <SubmitBtn type="submit">SIGN UP</SubmitBtn>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  justify-content: center;
  align-items: center;
  background-color: #000;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%;
  max-width: 1000px;
  gap: 2em;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2em;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.75rem;
`;

const ProfileSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const SubmitBtn = styled.button`
  padding: 0.75em 2.5em;
  border-radius: 1.5625em;
  background: #fff;
  border: none;
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 1.6875em;
  font-weight: 400;
  cursor: pointer;
  margin-top: 1em;
  @media (max-width: 768px) {
    padding: 0.5em 2em;
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6262;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  margin-top: 1em;
`;

export default SignupForm;
