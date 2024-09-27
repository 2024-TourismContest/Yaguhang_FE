import styled from "styled-components";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";

interface MenuItemProps {
  to: string;
  label: string;
}

function MenuItem({ to, label }: MenuItemProps) {
  return (
    <MenuItemContainer to={to}>
      {label} <img src={arrow} alt="arrow" />
    </MenuItemContainer>
  );
}

export default MenuItem;

const MenuItemContainer = styled(Link)`
  margin-bottom: 1rem;
  background: #d9d9d9;
  padding: 24px 30px;
  border-radius: 20px;
  z-index: 10;
  color: #686868;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: #b4b4b4;
  }
`;
