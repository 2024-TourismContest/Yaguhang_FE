import { useState } from "react";
import styled from "styled-components";
import { Route, Routes, Link } from "react-router-dom";

// Sample components for detailed pages
const DetailPage1 = () => <div>상세 페이지 1</div>;
const DetailPage2 = () => <div>상세 페이지 2</div>;
const DetailPage3 = () => <div>상세 페이지 3</div>;
const DetailPage4 = () => <div>상세 페이지 4</div>;

export default function MyPage() {
  return (
    <PageContainer>
      <MenuContainer>
        <MenuItem>
          <Link to="/mypage/1">메뉴 1</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/mypage/2">메뉴 2</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/mypage/3">메뉴 3</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/mypage/4">메뉴 4</Link>
        </MenuItem>
      </MenuContainer>
      <ContentContainer>
        <Routes>
          <Route path="1" element={<DetailPage1 />} />
          <Route path="2" element={<DetailPage2 />} />
          <Route path="3" element={<DetailPage3 />} />
          <Route path="4" element={<DetailPage4 />} />
        </Routes>
      </ContentContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  background: #000;
  min-height: 100vh;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
`;

const MenuContainer = styled.div`
  width: 250px;
  background: #333;
  padding: 1rem;
  margin-right: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: #fff;
    display: block;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: #555;
    }
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  padding: 1rem;
  background: #fff;
  border-radius: 4px;
`;
