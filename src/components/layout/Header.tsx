import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import authStore from "../../store/authStore";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAuthenticated, setIsAuthenticated } = authStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    } else {
      window.location.href = "/login";
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
      <HamburgerMenu onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenu>
      {isMenuOpen && (
        <MobileMenu>
          <NavItemMobile>
            <StyledNavLinkMobile to="/" isActive={currentPath === "/"}>
              홈
            </StyledNavLinkMobile>
          </NavItemMobile>
          <NavItemMobile>
            <StyledNavLinkMobile
              to="/stadium"
              isActive={currentPath === "/stadium"}
            >
              구장행
            </StyledNavLinkMobile>
          </NavItemMobile>
          <NavItemMobile>
            <StyledNavLinkMobile
              to="/region"
              isActive={currentPath === "/region"}
            >
              추천행
            </StyledNavLinkMobile>
          </NavItemMobile>
          <NavItemMobile>
            <StyledNavLinkMobile
              to="/mypage"
              isActive={currentPath === "/mypage"}
            >
              마이페이지
            </StyledNavLinkMobile>
          </NavItemMobile>
          <LoginButtonContainerMobile>
            <StyledLoginButton onClick={handleAuthButtonClick}>
              {isAuthenticated ? "로그아웃" : "로그인"}
            </StyledLoginButton>
          </LoginButtonContainerMobile>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
}

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
  background: ${({ isMenuOpen }) => (isMenuOpen ? "#333" : "transparent")};
  transition: background 0.3s;
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

const StyledNavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
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

const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0;
  background: transparent;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
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
  padding: 1rem;
  gap: 1rem;
  z-index: 1000;
`;

const NavItemMobile = styled.div``;

const StyledNavLinkMobile = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  display: block;
  background: ${({ isActive }) => (isActive ? "#444" : "transparent")};
  border-radius: 4px;
`;

const LoginButtonContainerMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
