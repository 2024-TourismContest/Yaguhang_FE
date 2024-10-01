import { useEffect, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import InputWithLabel from "../../components/common/InputWithLabel";
import { mypage } from "../../apis/mypage";
import useModalStore from "../../store/modalStore";
import { auth } from "../../apis/auth";
import useAuthStore from "../../store/authStore";
import { validatePassword, validateConfirmPassword, validateNickname } from "../../utils/validate";

const MyAccount = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({
    nickname: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [originalInfo, setOriginalInfo] = useState({
    nickname: "",
    email: "",
  });

  const logout = useAuthStore((state) => state.logout);
  const { openModal, closeModal } = useModalStore();
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const myInfo = await mypage.getMyInfo();
        setNickname(myInfo.nickname);
        setEmail(myInfo.email);
        setOriginalInfo({
          nickname: myInfo.nickname,
          email: myInfo.email,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching MyPage data:", error);
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleTogglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateInfo = () => {
    const newErrors = { ...errors };
    newErrors.nickname = validateNickname(nickname);

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const validatePasswordFields = () => {
    const newErrors = { ...errors };
    newErrors.currentPassword =
      currentPassword.trim() === "" ? "현재 비밀번호를 입력해 주세요." : "";
    newErrors.newPassword = validatePassword(newPassword);
    newErrors.confirmPassword = validateConfirmPassword(
      newPassword,
      confirmPassword
    );

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };
  const handleSaveInfo = async () => {
    if (validateInfo()) {
      try {
        await mypage.EditProfile(nickname, "");
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

    if (validatePasswordFields()) {
      try {
        const isPasswordValid = await mypage.CheckPassword(currentPassword);
        if (!Boolean(isPasswordValid)) {
          setErrors((prev) => ({
            ...prev,
            currentPassword: "유효하지 않은 비밀번호입니다. 다시 확인해주세요.",
          }));
          return;
        }

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

  const handleDeleteAccount = async () => {
    openModal({
      title: "회원 탈퇴",
      content: `
            탈퇴 시 모든 북마크 및 저장된 정보가 영구히 삭제됩니다.\n
            이 작업은 되돌릴 수 없어요. 정말 탈퇴하시겠어요?
            `,
      onConfirm: async () => {
        try {
          await auth.deleteAccount();
          closeModal();
          logout();
        } catch (error) {
          console.error("Error deleting account:", error);
          openModal({
            title: "탈퇴 실패",
            content: "회원 탈퇴 중 문제가 발생했습니다. 다시 시도해 주세요.",
            onConfirm: () => {
              closeModal();
            },
          });
        }
      },
      showCancel: true,
    });
  };

  const resetForm = () => {
    setNickname(originalInfo.nickname);
    setEmail(originalInfo.email);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <MainPageContainer>
      <SectionTitle title={"내 정보"} />
      <Section>
        <InputWithLabel
          label="Nickname"
          type="text"
          value={nickname || ""}
          onChange={(e) => setNickname(e.target.value)}
          error={errors.nickname}
        />
        <InputWithLabel
          label="Email"
          type="text"
          value={email || ""}
          readOnly={true}
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
          type={showPassword.current ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          onTogglePassword={() => handleTogglePasswordVisibility("current")}
        />
        <InputWithLabel
          label="New PW"
          type={showPassword.new ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          onTogglePassword={() => handleTogglePasswordVisibility("new")}
        />
        <InputWithLabel
          label="Confirm PW"
          type={showPassword.confirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          onTogglePassword={() => handleTogglePasswordVisibility("confirm")}
          passwordMatch={confirmPassword === newPassword}
        />
      </Section>
      <ButtonContainer>
        <CancelButton onClick={resetForm}>취소</CancelButton>
        <SaveButton onClick={handleSavePassword}>저장</SaveButton>
      </ButtonContainer>

      <Line />

      <DeleteAccountButton onClick={handleDeleteAccount}>
        회원 탈퇴
      </DeleteAccountButton>
    </MainPageContainer>
  );
};

export default MyAccount;

const MainPageContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
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
  border: 1px solid #ccc;
  color: #fff;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.2s;

  &:hover {
    background-color: #222222;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SaveButton = styled.button`
  padding: 0.5em 1em;
  background-color: #fff;
  color: #000;
  border: 1px solid #fff;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.2s;

  &:hover {
    /* font-weight: 700; */
    background-color: #c2c2c2;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DeleteAccountButton = styled.button`
  padding: 0.5em 1em;
  background-color: transparent;
  border: 1px solid #a4a4a4;
  color: #a4a4a4;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.2rem;
  width: fit-content;
  margin-left: auto;
  transition: 0.2s;

  &:hover {
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
