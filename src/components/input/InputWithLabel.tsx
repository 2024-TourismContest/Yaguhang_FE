import styled from "styled-components";

// InputWithLabel component
const InputWithLabel = ({ label, value, onChange, type = "text" }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  );
};

// Styled components
const InputContainer = styled.div`
  border: 0.3px solid #fff;
  background-color: #000;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1em 1.5em;
  border-radius: 0.933rem;
  gap: 20px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  color: white;
  font-size: 16.66px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: #000;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 16.66px;
  font-weight: 400;
  text-align: left;

  &:focus {
    outline: none; /* Removes the default blue outline */
    border: none;  /* Removes the border on focus */
  }
`;

export default InputWithLabel;