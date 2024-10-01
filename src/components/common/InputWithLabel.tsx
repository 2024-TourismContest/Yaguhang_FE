import React from "react";
import styled from "styled-components";
import eyeIcon from "../../assets/icons/eye.png";
import eyeOffIcon from "../../assets/icons/eye-off.png";
import checkIcon from "../../assets/icons/check.png";
interface InputWithLabelProps {
  label?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  showConfirmPassword?: boolean;
  passwordMatch?: boolean;
  readOnly?: boolean;
  width?: string;
  placeholder?: string;
}
const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  onTogglePassword,
  passwordMatch,
  readOnly = false,
  width,
  placeholder,
}) => {
  return (
    <InputWrapper>
      <InputContainer hasError={!!error} width={width}>
        <LabelContainer>
          <Label>{label}</Label>
        </LabelContainer>
        <InputWrapperWithIcon>
          <Input
            type={type}
            value={value}
            onChange={onChange}
            hasError={!!error}
            readOnly={readOnly}
            placeholder={placeholder}
          />
          {passwordMatch && <CheckIcon src={checkIcon} alt="check" />}
          {onTogglePassword && !readOnly && (
            <TogglePasswordButton type="button" onClick={onTogglePassword}>
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
export default InputWithLabel;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputContainer = styled.div<{ hasError: boolean; width?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem 1.5em;
  border-radius: 0.933rem;
  background-color: #000;
  border: 0.3px solid ${({ hasError }) => (hasError ? "#ff4d4f" : "#fff")};
  gap: 10px;
  position: relative;

  width: ${({ width }) => width || ""};
`;

const InputWrapperWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  flex: 1;
`;

const Label = styled.div`
  padding: 0.4rem 0;
  color: white;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  width: 110px;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    width: 90px;
  }
`;

const Input = styled.input<{ hasError: boolean }>`
  border: none;
  background-color: #000;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  padding-right: 2rem;
  height: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
  s &[readonly] {
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TogglePasswordButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  img {
    width: 1rem;
    height: auto;
  }
`;

const CheckIcon = styled.img`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: auto;
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 0.5em;
  display: block;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  border-right: 1px solid #cfcfcf;
`;
