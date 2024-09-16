import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../input/InputWithLabel";
import { auth } from "../../apis/auth";
import ProfileImg from "../common/ProfileImg";

type Validators = {
  [key: string]: (value: string) => string;
};

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const validatePhoneNumber = (phone: string): boolean =>
    /^\d{3}-\d{3,4}-\d{4}$/.test(phone);

  const formatPhoneNumber = (phone: string): string =>
    phone.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");

  const validators: Validators = {
    email: (value: string) =>
      validateEmail(value) ? "" : "유효한 이메일 주소를 입력해주세요.",
    password: (value: string) =>
      validatePassword(value)
        ? ""
        : "비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.",
    confirmPassword: (value: string) =>
      value === password ? "" : "비밀번호가 일치하지 않습니다.",
    phoneNumber: (value: string) =>
      validatePhoneNumber(value) ? "" : "올바른 휴대폰 번호를 입력해주세요.",
  };

  const validateField = (field: keyof Validators, value: string): string => {
    return validators[field] ? validators[field](value) : "";
  };

  const validateForm = (): boolean => {
    const newErrors = Object.keys(errors).reduce((acc, field) => {
      const key = field as keyof Validators;
      acc[key] = validateField(
        key,
        key === "confirmPassword"
          ? confirmPassword
          : key === "phoneNumber"
          ? phoneNumber
          : email
      );
      return acc;
    }, {} as Record<keyof Validators, string>);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("입력한 정보가 유효하지 않습니다. 오류를 확인해주세요.");
      return;
    }

    try {
      const res = await auth.signup({
        email,
        password,
        nickname,
        phoneNumber: phoneNumber || "",
        profileImage: profileImage || "",
      });

      if (
        window.confirm(
          "회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }

      console.log("회원가입 성공:", res);
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const updateField = (field: keyof Validators, value: string) => {
    const formattedValue =
      field === "phoneNumber" ? formatPhoneNumber(value) : value;
    const error = validateField(field, formattedValue);

    setErrors((prev) => ({ ...prev, [field]: error }));

    switch (field) {
      case "email":
        setEmail(formattedValue);
        break;
      case "password":
        setPassword(formattedValue);
        break;
      case "confirmPassword":
        setConfirmPassword(formattedValue);
        break;
      case "phoneNumber":
        setPhoneNumber(formattedValue);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (
    field: "email" | "password" | "confirmPassword" | "phoneNumber",
    value: string
  ) => {
    updateField(field, value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePasswordVisibility = (
    field: "password" | "confirmPassword"
  ) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  return (
    <FormContainer>
      <Title>회원가입</Title>
      <FormWrapper>
        <ProfileImgContainer>
          <ProfileImg
            profileImage={profileImage}
            onImageChange={handleImageChange}
            isEditing={true}
          />
          <ProfileText>프로필 이미지</ProfileText>
        </ProfileImgContainer>
        <Form onSubmit={handleSubmit}>
          <InputWithLabel
            label="Email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
          />
          <InputWithLabel
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            showPassword={showPassword}
            onTogglePassword={() => handleTogglePasswordVisibility("password")}
          />
          <InputWithLabel
            label="Confirm PW"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              handleTogglePasswordVisibility("confirmPassword")
            }
            passwordMatch={confirmPassword === password}
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
  gap: 5em;

  margin-top: 20px;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 5em;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.75rem;
  padding-bottom: 1.5rem;
  width: 80%;
  border-bottom: 1px solid #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileText = styled.span`
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  padding: 1rem;
  border-bottom: 0.3px solid #fff;
`;

export default SignupForm;
