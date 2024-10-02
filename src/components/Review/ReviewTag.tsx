import React, { useState } from "react";
import styled from "styled-components";

interface ReviewTagProps {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const MAX_TAG_SELECTION = 5;

const ReviewTag: React.FC<ReviewTagProps> = ({
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const handleTagClick = (tag: string) => {
    // 선택된 태그가 5개 이상일 때 추가 선택을 막음
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else if (selectedTags.length < MAX_TAG_SELECTION) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <Tag
          key={index}
          isSelected={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
          disabled={
            selectedTags.length >= MAX_TAG_SELECTION &&
            !selectedTags.includes(tag)
          }
        >
          {tag}
        </Tag>
      ))}
    </TagContainer>
  );
};

const ReviewTagToggle: React.FC<ReviewTagProps> = ({
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const [isTagVisible, setIsTagVisible] = useState(false);

  const toggleTagVisibility = () => {
    setIsTagVisible(!isTagVisible);
  };

  return (
    <div>
      <TagToggleHeader onClick={toggleTagVisibility}>
        {isTagVisible
          ? "💡 이 가게에 어울리는 태그를 골라주세요.(1~5개)"
          : "💬 이런 점이 좋았어요!"}
      </TagToggleHeader>

      {isTagVisible && (
        <ReviewTag
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      )}
    </div>
  );
};

export default ReviewTagToggle;

// 태그 컨테이너 스타일
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
  max-height: 150px;
  overflow-y: auto;
  border-radius: 10px;
  padding: 10px;
  background-color: #2b2b2b;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 5px;
    padding: 5px;
    max-height: 120px;
  }
`;

const Tag = styled.div<{ isSelected: boolean; disabled: boolean }>`
  padding: 0.6rem 1rem;
  border-radius: 25px;
  background-color: ${({ isSelected }) => (isSelected ? "#3a8dff" : "#444444")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#ccc")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0 4px 6px rgba(0, 0, 0, 0.2)" : "none"};

  &:hover {
    background-color: ${({ isSelected, disabled }) =>
      disabled ? "#444444" : isSelected ? "#327ae6" : "#555555"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const TagToggleHeader = styled.h3`
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    color: #ccc;
    transform: scale(1.02);
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #1f1f1f;
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;
