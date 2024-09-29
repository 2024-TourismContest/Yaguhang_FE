import { styled } from "styled-components";

export const Option = ({
  selectedOption,
  handleOptionChange,
}: {
  selectedOption: string;
  handleOptionChange: (option: string) => void;
}) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOptionChange(e.target.value);
  };

  return (
    <Container>
      <Select value={selectedOption} onChange={onChangeSelect}>
        <SelectOption value="인기순">인기순</SelectOption>
        <SelectOption value="최신순">최신순</SelectOption>
      </Select>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 5vh;
  width: 100%;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    padding-right: 10%;
  }
`;
const Select = styled.select`
  width: 82px;
  border: 1px solid white;
  border-radius: 2em;
  padding: 3px 5px;
  background-color: transparent;
  color: white;
`;
const SelectOption = styled.option`
  color: black;
  background-color: transparent;
`;
