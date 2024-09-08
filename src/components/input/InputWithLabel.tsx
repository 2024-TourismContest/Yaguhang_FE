import React from "react";
import styled from "styled-components";

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChange,
  type = "text",
  error,
}) => {
  return (
    <InputWrapper>
      <InputContainer>
        <Label>{label}</Label>
        <Input type={type} value={value} onChange={onChange} />
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.2em 1.5em;
  border-radius: 0.933rem;
  background-color: #000;
  border: 0.3px solid #fff;
  gap: 20px;
`;

const Label = styled.div`
  color: white;
  font-size: 16.66px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  width: 150px; /* 라벨 너비 고정 */
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

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 0.5em;
  display: block;
`;

export default InputWithLabel;
