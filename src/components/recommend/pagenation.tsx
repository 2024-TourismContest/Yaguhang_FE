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
      setCurrentPage(0);
      setPageList(0);
    } else if (value === "last") {
      setCurrentPage(lastPage);
      setPageList(lastPage - 8);
    } else if (value === "prev") {
      if (currentPage > 0) {
        if (pageList === currentPage) {
          setPageList(pageList - 1);
        }
        setCurrentPage(currentPage - 1);
      } else if (currentPage <= pageList && currentPage !== 0) {
        setPageList(pageList - 1);
      }
    } else if (value === "next") {
      if (currentPage < lastPage) {
        if (currentPage === pageList + 8 && currentPage !== lastPage) {
          setPageList(pageList + 1);
        }
        setCurrentPage(currentPage + 1);
      }
    } else {
      setCurrentPage(Number(value));
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    setPageList(0);
  }, [lastPage, setCurrentPage]);
  if (!lastPage) return;
  return (
    <Wrapper>
      <Page value="first" onClick={handleClick} disabled={currentPage === 0}>
        &lt;&lt;
      </Page>
      <Page value="prev" onClick={handleClick} disabled={currentPage === 0}>
        &lt;
      </Page>
      {Array.from(
        { length: Math.min(9, lastPage - pageList) }, // lastPage에 맞춰 버튼 개수를 조정
        (_, index) => (
          <Page
            key={index}
            value={pageList + index}
            onClick={handleClick}
            disabled={pageList + index > lastPage}
            isSelected={pageList + index === currentPage}>
            {pageList + index + 1}
          </Page>
        )
      )}
      <Page
        value="next"
        onClick={handleClick}
        disabled={currentPage === lastPage}>
        &gt;
      </Page>
      <Page
        value="last"
        onClick={handleClick}
        disabled={currentPage === lastPage}>
        &gt;&gt;
      </Page>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
  position: fixed;
  bottom: 10px;
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
