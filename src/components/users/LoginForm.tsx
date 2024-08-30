import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 카카오 로그인 버튼 클릭 시 호출되는 함수
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = "https://yaguhang.kro.kr:8443/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/users/login";
    window.location.href = kakaoLoginUrl;
  };

  // 카카오 로그인 후 리디렉션 URL에서 액세스 토큰을 추출하여 저장하는 함수
  useEffect(() => {
    const handleTokenExtraction = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');

      console.log("Current URL:", window.location.href);
      console.log("Search Params:", window.location.search);
      console.log("Extracted Token:", token);

      if (token) {
        localStorage.setItem('accessToken', token);
        navigate('/'); // 토큰이 저장된 후 홈으로 리디렉션
      } else {
        console.log("No token found in URL.");
      }
    };

    handleTokenExtraction(); // 페이지가 로드될 때 토큰 추출 함수 호출
  }, [navigate]);

  // 폼 제출 처리 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // 여기에 이메일과 비밀번호를 사용하여 로그인 API를 호출하는 로직 추가
      console.log("로그인 처리: ", email, password);
      navigate("/");
    } catch (err) {
      setError("로그인에 실패했습니다.");
    }
  };

  return (
    <FormContainer>
      <Title>로그인</Title>
      <KaKaoButton onClick={handleKakaoLogin}>카카오톡으로 계속하기</KaKaoButton>
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