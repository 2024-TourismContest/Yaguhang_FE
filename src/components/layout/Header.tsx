import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 30px;
  box-sizing: border-box;
`;

const LogoIcon = styled.img`
  height: 100px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 18pt;
  &:hover {
    color: #007bff;
  }
`;

export default function Header() {
  return (
    <NavbarContainer>
      <div>
        <Link to="/" className="logo">
          <LogoIcon src={logo} alt="Logo" />
        </Link>        
      </div>
      <NavList>
        <NavItem><NavLink href="betel">구장별</NavLink></NavItem>
        <NavItem><NavLink href="region">지역별</NavLink></NavItem>
        <NavItem><NavLink href="map">지도</NavLink></NavItem>
      </NavList>
    </NavbarContainer>
  );
}