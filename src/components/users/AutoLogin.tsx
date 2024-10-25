import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../../apis/auth";

export default function autoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const email = "yaguhang@test.com";
    const password = "yaguhang123";
    const handleSubmit = async () => {
      try {
        await auth.login(email, password);
        localStorage.setItem("showFanTeamModalOnHome", "true"); // 로그인 후 홈 페이지에서 모달을 표시할지 여부 저장
        navigate("/");
      } catch (err) {
        console.log(email, password);
      }
    };
    handleSubmit();
    console.log("실행됨");
  }, []);
  return <Info>테스트 계정으로 로그인 중입니다...</Info>;
}

const Info = styled.div`
  color: white;
`;
