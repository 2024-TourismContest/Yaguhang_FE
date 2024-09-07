import styled from "styled-components";

const InputWithLabel = ({ label, value, onChange, type = "text" }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 1.5em;
  border-radius: 0.933rem;
  background-color: #000;
  border: 0.3px solid #fff;
  gap: 20px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  color: white;
  font-size: 16.66px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  width: 100px; /* 라벨 너비 고정 */
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: #000;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 16.66px;
  font-weight: 400;
  text-align: left;

  &:focus {
    outline: none;
    border: none;
  }
`;

export default InputWithLabel;
