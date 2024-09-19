import styled from "styled-components";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";

interface MenuItemProps {
  to: string;
  label: string;
}

function MenuItem({ to, label }: MenuItemProps) {
  return (
    <MenuItemContainer>
      <Link to={to}>
        {label} <img src={arrow} alt="arrow" />
      </Link>
    </MenuItemContainer>
  );
}

export default MenuItem;

const MenuItemContainer = styled.div`
  margin-bottom: 1rem;
  background: #d9d9d9;
  padding: 28px 36px;
  border-radius: 20px;

  a {
    color: #686868;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
  }

  &:hover {
    background: #b4b4b4;
  }
`;
