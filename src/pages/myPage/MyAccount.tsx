import { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import InputWithLabel from "../../components/input/InputWithLabel";
import { mypage } from "../../apis/mypage";
import useModalStore from "../../store/modalStore";

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

  const { openModal, closeModal } = useModalStore();

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

  const handleSaveInfo = async () => {
    if (validateInfo()) {
      try {
        await mypage.EditProfile(name, phoneNumber);
        console.log("정보 저장 요청 완료:", { name, phoneNumber });
      } catch (error) {
        console.error("Error saving info:", error);
      }
    }
  };

  const handleSavePassword = async () => {
    const kakaoResponse = await mypage.CheckKakao();
    if (kakaoResponse === "kakao") {
      openModal({
        title: "비밀번호 변경 오류",
        content: "카카오로그인은 비밀번호를 변경할 수 없어요!",
        onConfirm: () => {
          closeModal();
        },
      });
      resetForm();
      return;
    }

    if (validatePassword()) {
      try {
        // 비밀번호 확인 API 호출
        const isPasswordValid = await mypage.CheckPassword(currentPassword);
        if (!Boolean(isPasswordValid)) {
          setErrors((prev) => ({
            ...prev,
            currentPassword: "유효하지 않은 비밀번호입니다. 다시 확인해주세요.",
          }));
          return;
        }

        // 비밀번호 변경 API 호출
        await mypage.ChangePassword(newPassword);

        openModal({
          title: "비밀번호 변경 완료",
          content: "비밀번호가 성공적으로 변경되었습니다.",
          onConfirm: () => {
            closeModal();
          },
        });

        resetForm();
      } catch (error) {
        console.error("Error saving password:", error);
        openModal({
          title: "비밀번호 변경 실패",
          content: "비밀번호 변경 중 문제가 발생했습니다. 다시 시도해 주세요.",
          onConfirm: () => {
            closeModal();
          },
        });
      }
    }
  };

  const resetForm = () => {
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
      <Section>
        <InputWithLabel
          label="Nickname"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <InputWithLabel
          label="Email"
          type="text"
          value={email}
          readOnly={true}
        />
        <InputWithLabel
          label="Phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={errors.phoneNumber}
        />
      </Section>
      <ButtonContainer>
        <CancelButton onClick={resetForm}>취소</CancelButton>
        <SaveButton onClick={handleSaveInfo}>저장</SaveButton>
      </ButtonContainer>

      <Line />
      <SectionTitle title={"비밀번호 변경"} />
      <Section>
        <InputWithLabel
          label="Current PW"
          type={showPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          onTogglePassword={handleTogglePassword}
        />
        <InputWithLabel
          label="New PW"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          onTogglePassword={handleTogglePassword}
        />
        <InputWithLabel
          label="Confirm PW"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          passwordMatch={newPassword === confirmPassword}
          onTogglePassword={handleTogglePassword}
        />
      </Section>
      <ButtonContainer>
        <CancelButton onClick={resetForm}>취소</CancelButton>
        <SaveButton onClick={handleSavePassword}>저장</SaveButton>
      </ButtonContainer>
    </MainPageContainer>
  );
};

export default MyAccount;

const MainPageContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  gap: 2rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #686868;
  margin: 2em 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 500px;
  @media (max-width: 768px) {
    width: auto;
  }
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
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SaveButton = styled.button`
  padding: 0.5em 1em;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
