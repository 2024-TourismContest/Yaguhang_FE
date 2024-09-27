import { styled } from "styled-components";
import { SearchIcon } from "../../assets/icons/SearchIcon";

export const SearchInput = ({
  handleInputChange,
  getRecommendList,
  searchWord,
}: {
  handleInputChange: (word: string) => void;
  getRecommendList: () => void;
  searchWord: string;
}) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value);
  };
  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getRecommendList(); // 엔터 키를 눌렀을 때 getRecommendList 실행
    }
  };
  return (
    <InputWrapper>
      <Input
        type="text"
        value={searchWord}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
        placeholder="다른 여행자들의 여행코스를 검색해보아요"
      />
      <Button onClick={getRecommendList}>
        <SearchIcon />
      </Button>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius: 3rem;
  width: 60%;
  max-width: 750px;
  height: 56px;
  position: relative;
  @media (max-width: 1024px) {
    height: 40px;
  }
`;
const Input = styled.input`
  position: absolute;
  left: 5%;
  background-color: transparent;
  border: none;
  width: 60%;
  height: 95%;
  color: white;
  font-size: 1em;
  &:focus {
    outline: none;
    border: none;
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 15px;
  top: 10px;
  svg {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 1024px) {
    top: 5px;
  }
`;
