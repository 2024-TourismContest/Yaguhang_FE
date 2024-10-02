import React from "react";
import styled from "styled-components";

interface ReviewTagProps {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReviewTag: React.FC<ReviewTagProps> = ({
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
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
        >
          {tag}
        </Tag>
      ))}
    </TagContainer>
  );
};

export default ReviewTag;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
  background-color: yellow; /* 임시 배경색 */
`;

const Tag = styled.div<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "#f0f0f0")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#333")};
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#0056b3" : "#e0e0e0"};
  }
`;
