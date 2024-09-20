import { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import InputWithLabel from "../../components/input/InputWithLabel";

const MyAccount = () => {
  const [name, setName] = useState("사용자 이름");
  const [email] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateInfo = () => {
    const newErrors = { ...errors };
    newErrors.name = name.trim() === "" ? "이름을 입력해 주세요." : "";

    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    newErrors.phoneNumber = !phoneRegex.test(phoneNumber)
      ? "전화번호 형식이 올바르지 않습니다."
      : "";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const validatePassword = () => {
    const newErrors = { ...errors };
    newErrors.currentPassword =
      currentPassword.trim() === "" ? "현재 비밀번호를 입력해 주세요." : "";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    newErrors.newPassword = !passwordRegex.test(newPassword)
      ? "비밀번호는 최소 8자 이상, 문자와 숫자를 포함해야 합니다."
      : "";

    newErrors.confirmPassword =
      newPassword !== confirmPassword ? "비밀번호가 일치하지 않습니다." : "";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSaveInfo = () => {
    if (validateInfo()) {
      console.log("정보 저장 요청:", { name, phoneNumber });
    }
  };

  const handleSavePassword = () => {
    if (validatePassword()) {
      console.log("비밀번호 변경 요청:", { currentPassword, newPassword });
    }
  };

  const handleCancel = () => {
    setName("사용자 이름");
    setPhoneNumber("010-1234-5678");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <MainPageContainer>
      <SectionTitle title={"내 정보"} />
      <InfoSection>
        <InputWithLabel
          label="Nickname"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          width="450px"
        />
        <InputWithLabel
          label="Email"
          type="text"
          value={email}
          readOnly={true}
          width="450px"
        />
        <InputWithLabel
          label="Phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={errors.phoneNumber}
          width="450px"
        />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <SaveButton onClick={handleSaveInfo}>저장</SaveButton>
        </ButtonContainer>
      </InfoSection>

      <Line />

      <SectionTitle title={"비밀번호 변경"} />
      <PasswordChangeSection>
        <InputWithLabel
          label="Current PW"
          type={showPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          onTogglePassword={handleTogglePassword}
          width="450px"
        />
        <InputWithLabel
          label="New PW"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          onTogglePassword={handleTogglePassword}
          width="450px"
        />
        <InputWithLabel
          label="Confirm PW"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          passwordMatch={newPassword === confirmPassword}
          onTogglePassword={handleTogglePassword}
          width="450px"
        />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <SaveButton onClick={handleSavePassword}>저장</SaveButton>
        </ButtonContainer>
      </PasswordChangeSection>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #686868;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 2em;
`;

const PasswordChangeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

const CancelButton = styled.button`
  padding: 0.5em 1em;
  background-color: transparent;
  color: #000;
  border: 1px solid #ccc;
  color: #fff;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.2rem;
`;

const SaveButton = styled.button`
  padding: 0.5em 1em;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.2rem;
`;

export default MyAccount;
