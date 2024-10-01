export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "유효한 이메일 주소를 입력해주세요.";
};

export const validatePassword = (password: string): string => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password)
    ? ""
    : "비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  return password === confirmPassword ? "" : "비밀번호가 일치하지 않습니다.";
};

export const validateNickname = (nickname: string): string => {
  return nickname.trim() === "" ? "이름을 입력해 주세요." : "";
};
