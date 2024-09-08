import React from "react";
import styled from "styled-components";
import eyeIcon from "../../assets/icons/eye.png";
import eyeOffIcon from "../../assets/icons/eye-off.png";
import checkIcon from "../../assets/icons/check.png";

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  showConfirmPassword?: boolean;
  passwordMatch?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  showPassword,
  onTogglePassword,
  showConfirmPassword,
  passwordMatch,
}) => {
  return (
    <InputWrapper>
      <InputContainer>
        <Label>{label}</Label>
        <InputWrapperWithIcon>
          <Input
            type={type}
            value={value}
            onChange={onChange}
            className={showPassword || showConfirmPassword ? "with-icon" : ""}
          />
          {passwordMatch && <CheckIcon src={checkIcon} alt="check" />}
          {onTogglePassword && (
            <TogglePasswordButton onClick={onTogglePassword}>
              <img
                src={type === "password" ? eyeIcon : eyeOffIcon}
                alt="toggle password visibility"
              />
            </TogglePasswordButton>
          )}
        </InputWrapperWithIcon>
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
  justify-content: center;
  padding: 1.2em 1.5em;
  border-radius: 0.933rem;
  background-color: #000;
  border: 0.3px solid #fff;
  gap: 10px;
`;

const InputWrapperWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
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

  &.with-icon {
    padding-right: 3rem; /* 아이콘의 너비만큼 여백 추가 */
  }
`;

const TogglePasswordButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 1rem;
    height: auto;
  }
`;

const CheckIcon = styled.img`
  margin-right: 0.3rem;
  width: 1rem;
  height: auto;
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 0.5em;
  display: block;
`;

export default InputWithLabel;
