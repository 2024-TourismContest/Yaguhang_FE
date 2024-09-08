import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../input/InputWithLabel";
import { auth } from "../../apis/auth";
import ProfileEditSection from "../profile/ProfileEditSection";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const formatPhoneNumber = (phone: string) => {
    return phone
      .replace(/[^0-9]/g, "")
      .replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;
    const newErrors: { [key: string]: string } = {};

    if (!email || !validateEmail(email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
      hasError = true;
    }
    if (!password || !validatePassword(password)) {
      newErrors.password =
        "비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.";
      hasError = true;
    }
    if (!confirmPassword || password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      hasError = true;
    }
    if (!phoneNumber || !/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "올바른 휴대폰 번호를 입력해주세요.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      alert("입력한 정보가 유효하지 않습니다. 오류를 확인해주세요.");
      return;
    }

    try {
      const res = await auth.signup({
        email,
        password,
        nickname,
        phoneNumber,
        profileImage,
      });
      const confirm = window.confirm("회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동하시겠습니까?");
      console.log("회원가입 성공:", res);

      if (confirm) {
        navigate("/login");
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleInputChange = (
    field: string,
    value: string,
    validateFn?: (value: string) => boolean
  ) => {
    let error = "";

    if (validateFn && value && !validateFn(value)) {
      switch (field) {
        case "email":
          error = "유효한 이메일 주소를 입력해주세요.";
          break;
        case "password":
          error = "비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.";
          break;
        case "confirmPassword":
          error = "비밀번호가 일치하지 않습니다.";
          break;
        case "phoneNumber":
          error = "올바른 휴대폰 번호를 입력해주세요.";
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));

    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "phoneNumber":
        setPhoneNumber(formatPhoneNumber(value));
        break;
      default:
        break;
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

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
            onChange={(e) =>
              handleInputChange("email", e.target.value, validateEmail)
            }
            error={errors.email}
          />
          <InputWithLabel
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) =>
              handleInputChange("password", e.target.value, validatePassword)
            }
            error={errors.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <InputWithLabel
            label="Confirm PW"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            error={errors.confirmPassword}
            showConfirmPassword={showConfirmPassword}
            passwordMatch={isPasswordMatch}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
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
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            error={errors.phoneNumber}
          />
          <SubmitBtn type="submit">SIGN UP</SubmitBtn>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  gap: 1.5em;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5em;
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

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SignupForm;