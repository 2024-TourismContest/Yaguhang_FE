import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../apis/auth";
import useModalStore from "../../store/modalStore";
const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
import useAuthStore from "../../store/authStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const { openModal, closeModal } = useModalStore();

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://yaguhang.kro.kr:8443/oauth2/authorization/kakao?redirect_uri=${redirect_uri}`;
    window.location.href = kakaoLoginUrl;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const errorParam = queryParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      localStorage.setItem("showFanTeamModalOnHome", "true"); // 로그인 후 홈 페이지에서 모달을 표시할지 여부 저장
      navigate("/");
    } else if (errorParam) {
      // 카카오 로그인 에러
      navigate("/login");
      openModal({
        title: "로그인 오류",
        content: "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.",
        onConfirm: () => {
          closeModal();
        },
      });
    }
  }, [navigate, setIsAuthenticated, openModal]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await auth.login(email, password);
      localStorage.setItem("showFanTeamModalOnHome", "true"); // 로그인 후 홈 페이지에서 모달을 표시할지 여부 저장
      navigate("/");
    } catch (err) {
      setError("로그인에 실패했습니다.");
    }
  };

  return (
    <FormContainer>
      <Title>로그인</Title>
      <KaKaoButton onClick={handleKakaoLogin}>
        카카오톡으로 계속하기
      </KaKaoButton>
      <Line />
      <InputContainer>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LinkText href="#">비밀번호를 잃어버렸나요?</LinkText>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitBtn onClick={handleSubmit}>LOGIN</SubmitBtn>
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
  border: none;
  color: #000;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1.6875em;
  font-weight: 400;
  cursor: pointer;
  margin-top: auto;
`;

const ErrorMessage = styled.p`
  color: #ff6262;
  font-family: Inter, sans-serif;
  font-size: 0.875rem;
  margin-top: 1em;
`;

export default LoginForm;
