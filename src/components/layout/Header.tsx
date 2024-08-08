import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavbarContainer>
      <LogoContainer>
        <Link to="/" className="logo">
          <LogoIcon src={logo} alt="Logo" />
        </Link>
      </LogoContainer>
      <NavList>
        <NavItem>
          <StyledNavLink to="/" isActive={currentPath === '/'}>홈</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/stadium" isActive={currentPath === '/stadium'}>구장</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/region" isActive={currentPath === '/region'}>지역</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/mypage" isActive={currentPath === '/mypage'}>마이페이지</StyledNavLink>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center; /* 가운데 정렬 */
  box-sizing: border-box;
  z-index: 1000;
  background: linear-gradient(
    to bottom, 
    rgb(0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.5) 75%, 
    rgba(0, 0, 0, 0) 100%
  );
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 11.6146vw;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const LogoIcon = styled.img`
  width: 7.9768vw;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 5.1rem;
  position: absolute;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledNavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: #FFF;
  text-align: center;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;
  
  &:hover {
    color: #b9b9b9;
  }

  ${({ isActive }) =>
    isActive &&
    `
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -0.62rem;
        width: 100%;
        height: 1px;
        background-color: #FFF;
      }
    `}
`;