import { useState } from "react";
import styled, { css } from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { faqData } from "./FaqData";

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 클릭 이벤트 핸들러
  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <FaqContainer>
      <FaqTitle>자주 묻는 질문 (FAQ)</FaqTitle>
      <FaqList>
        {faqData.map((item, index) => (
          <FaqItem key={index}>
            <FaqQuestion
              onClick={() => handleToggle(index)}
              isActive={activeIndex === index}
            >
              <QuestionIcon>
                <MdQuestionAnswer />
              </QuestionIcon>
              <span>{item.question}</span>
              <ChevronIcon isActive={activeIndex === index}>
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </ChevronIcon>
            </FaqQuestion>
            <FaqAnswer isActive={activeIndex === index}>
              {item.answer}
            </FaqAnswer>
          </FaqItem>
        ))}
      </FaqList>
    </FaqContainer>
  );
};

export default FaqPage;

const FaqContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1a1a1a;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin-top: 10vh;
  margin-bottom: 30vh;
`;

const FaqTitle = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #fff;
  font-weight: 500;
`;

const FaqList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FaqItem = styled.li`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
`;

const FaqQuestion = styled.h3<{ isActive: boolean }>`
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "#1e90ff" : "#f0f0f0")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(30, 144, 255, 0.1)" : "transparent"};

  &:hover {
    color: #1e90ff;
    background-color: rgba(30, 144, 255, 0.1);
  }
`;

const ChevronIcon = styled.div<{ isActive: boolean }>`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  ${({ isActive }) =>
    isActive
      ? css`
          transform: rotate(180deg);
        `
      : css`
          transform: rotate(0deg);
        `}
`;

const QuestionIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const FaqAnswer = styled.p<{ isActive: boolean }>`
  font-size: 1rem;
  color: #ccc;
  max-height: ${({ isActive }) => (isActive ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  margin-top: ${({ isActive }) => (isActive ? "1rem" : "0")};
  padding-left: 1.8rem;
  line-height: 1.5;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
`;
