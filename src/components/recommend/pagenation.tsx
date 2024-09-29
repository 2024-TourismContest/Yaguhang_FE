import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Pagenation = ({
  lastPage,
  currentPage,
  setCurrentPage,
}: {
  lastPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const [pageList, setPageList] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    if (value === "first") {
      setCurrentPage(0); // 첫 페이지로 이동
      setPageList(0); // 첫 번째 페이지 그룹으로 이동
    } else if (value === "last") {
      setCurrentPage(lastPage - 1); // 마지막 페이지로 이동 (0-based 처리)
      setPageList(Math.floor((lastPage - 1) / 9) * 9); // 마지막 페이지 그룹으로 이동
    } else if (value === "prev") {
      if (currentPage > 0) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        if (newPage < pageList) {
          setPageList(pageList - 9); // 이전 페이지 그룹으로 이동
        }
      }
    } else if (value === "next") {
      if (currentPage < lastPage - 1) {
        // 마지막 페이지로 이동 방지
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        if (newPage >= pageList + 9) {
          setPageList(pageList + 9); // 다음 페이지 그룹으로 이동
        }
      }
    } else {
      const newPage = Number(value);
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    setPageList(0);
  }, [lastPage, setCurrentPage]);

  // if (!lastPage) return null; // lastPage가 없는 경우 반환

  return (
    <Wrapper>
      <Page value="first" onClick={handleClick} disabled={currentPage === 0}>
        &lt;&lt;
      </Page>
      <Page value="prev" onClick={handleClick} disabled={currentPage === 0}>
        &lt;
      </Page>
      {Array.from(
        { length: Math.min(9, lastPage - pageList) }, // 9개씩 묶어서 표시
        (_, index) => (
          <Page
            key={index}
            value={pageList + index}
            onClick={handleClick}
            disabled={pageList + index >= lastPage} // 수정: >=로 변경
            isSelected={pageList + index === currentPage}>
            {pageList + index + 1} {/* 1-based로 표시 */}
          </Page>
        )
      )}
      <Page
        value="next"
        onClick={handleClick}
        disabled={currentPage >= lastPage - 1}>
        &gt;
      </Page>
      <Page
        value="last"
        onClick={handleClick}
        disabled={currentPage >= lastPage - 1}>
        &gt;&gt;
      </Page>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
`;

const Page = styled.button<{ isSelected?: boolean }>`
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;

  justify-content: center;
  align-items: center;
  color: ${(props) => (props.isSelected ? "#000" : "#fff")};
  background-color: ${(props) =>
    props.isSelected ? "#A7CFEC" : "transparent"};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  border: none;
  margin: 0 2px;

  &:disabled {
    color: #919191;
    cursor: not-allowed;
  }
`;

export default Pagenation;
