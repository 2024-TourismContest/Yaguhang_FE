import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authStore from "../../store/authStore";
import useModalStore from "../../store/modalStore";

const Header = () => {
  const { openModal, closeModal } = useModalStore();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = authStore();
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      openModal({
        title: "로그아웃 확인",
        content: "정말로 로그아웃하시겠습니까?",
        onConfirm: () => {
          logout();
          closeModal();
        },
        showCancel: true,
      });
    } else {
      navigate("/login");
    }
    setIsMenuOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("showFanTeamModalOnHome");
    window.location.reload();
  };

  const handleMypageClick = () => {
    if (!isAuthenticated) {
      openModal({
        title: "로그인 필요",
        content: "마이페이지를 이용하시려면 로그인해주세요.",
        onConfirm: () => {
          navigate("/login");
          closeModal();
        },
        showCancel: true,
      });
    } else {
      navigate("/mypage");
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleMobileLinkClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarContainer isMenuOpen={isMenuOpen}>
      <LogoContainer>
        <Link to="/" className="logo">
          <LogoIcon src={logo} alt="Logo" />
        </Link>
      </LogoContainer>
      <NavList>
        <NavItem>
          <NavLink to="/" isActive={currentPath === "/"}>
            홈
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/stadium" isActive={currentPath === "/stadium"}>
            구장행
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/region" isActive={currentPath === "/region"}>
            추천행
          </NavLink>
        </NavItem>
        <NavItem onClick={handleMypageClick}>
          <ButtonLink isActive={currentPath === "/mypage"}>
            마이페이지
          </ButtonLink>
        </NavItem>
      </NavList>
      <LoginButtonContainer>
        <StyledLoginButton onClick={handleAuthButtonClick}>
          {isAuthenticated ? "로그아웃" : "로그인"}
        </StyledLoginButton>
      </LoginButtonContainer>
      <HamburgerMenu onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenu>
      {isMenuOpen && (
        <MobileMenu>
          <NavItemMobile onClick={() => handleMobileLinkClick("/")}>
            <NavLinkMobile to="/" isActive={currentPath === "/"}>
              홈
            </NavLinkMobile>
          </NavItemMobile>
          <NavItemMobile onClick={() => handleMobileLinkClick("/stadium")}>
            <NavLinkMobile to="/stadium" isActive={currentPath === "/stadium"}>
              구장행
            </NavLinkMobile>
          </NavItemMobile>
          <NavItemMobile onClick={() => handleMobileLinkClick("/region")}>
            <NavLinkMobile to="/region" isActive={currentPath === "/region"}>
              추천행
            </NavLinkMobile>
          </NavItemMobile>
          <NavItemMobile onClick={handleMypageClick}>
            <ButtonLinkMobile isActive={currentPath === "/mypage"}>
              마이페이지
            </ButtonLinkMobile>
          </NavItemMobile>
          <NavItemMobile onClick={handleAuthButtonClick}>
            <ButtonLinkMobile isActive={currentPath === "/login"}>
              {isAuthenticated ? "로그아웃" : "로그인"}
            </ButtonLinkMobile>
          </NavItemMobile>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

// 공통 스타일 정의
const linkStyles = css<{ isActive?: boolean }>`
  text-decoration: none;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    `
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  `}
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  ${linkStyles}
`;

const ButtonLink = styled.span<{ isActive: boolean }>`
  ${linkStyles}
  cursor: pointer;
`;

const NavLinkMobile = styled(NavLink)`
  display: block;
  background: ${({ isActive }) => (isActive ? "#444" : "transparent")};
  padding: 1rem 2rem;
`;

const ButtonLinkMobile = styled(ButtonLink)`
  display: block;
  background: ${({ isActive }) => (isActive ? "#444" : "transparent")};
  padding: 1rem 2rem;
`;

const NavbarContainer = styled.nav<{ isMenuOpen: boolean }>`
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
  background: ${({ isMenuOpen }) =>
    isMenuOpen
      ? "#333"
      : "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))"};
  transition: background 0.3s;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2),
    rgba(255, 255, 255, 0.1)
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
  gap: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0;
`;

const LoginButtonContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-family: Inter, sans-serif;
  cursor: pointer;
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 1100;

  span {
    display: block;
    width: 25px;
    height: 2px;
    background: #fff;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  width: 100%;
  background: #333;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const NavItemMobile = styled.div``;

export default Header;
