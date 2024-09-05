import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import authStore from "../../store/authStore";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAuthenticated, setIsAuthenticated } = authStore();

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false); // 로그아웃 처리
      localStorage.removeItem("token");
    } else {
      window.location.href = "/login"; // 로그인 페이지로 이동
    }
  };

  return (
    <NavbarContainer>
      <LogoContainer>
        <Link to="/" className="logo">
          <LogoIcon src={logo} alt="Logo" />
        </Link>
      </LogoContainer>
      <NavList>
        <NavItem>
          <StyledNavLink to="/" isActive={currentPath === "/"}>
            홈
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/stadium" isActive={currentPath === "/stadium"}>
            구장행
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/region" isActive={currentPath === "/region"}>
            추천행
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/mypage" isActive={currentPath === "/mypage"}>
            마이페이지
          </StyledNavLink>
        </NavItem>
      </NavList>
      <LoginButtonContainer>
        <StyledLoginButton onClick={handleAuthButtonClick}>
          {isAuthenticated ? "로그아웃" : "로그인"}
        </StyledLoginButton>
      </LoginButtonContainer>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  box-sizing: border-box;
  z-index: 1000;
  background: linear-gradient(
    rgba(0, 0, 0, 0.9) 0%,  // 상단 색상 (어두운 검정)
    rgba(0, 0, 0, 0.7) 50%, // 중간 색상
    rgba(0, 0, 0, 0.5) 75%, // 하단 색상
    rgba(0, 0, 0, 0) 100%   // 끝 색상 (투명)
  );
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  width: 80px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 3rem; // 충분한 간격

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledNavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  padding: 0.75rem 1.5rem; // 넓은 위아래 패딩
  position: relative;

  ${({ isActive }) =>
    isActive &&
    `
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 2px;
        background-color: #fff;
      }
    `}
`;

const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0; // 박스 없애기
  background: transparent;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 0.875rem; // 로그인 버튼 글자 크기
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;

`;