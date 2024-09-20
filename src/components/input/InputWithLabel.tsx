import React from "react";
import styled from "styled-components";
import eyeIcon from "../../assets/icons/eye.png";
import eyeOffIcon from "../../assets/icons/eye-off.png";
import checkIcon from "../../assets/icons/check.png";

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange가 선택적이 됩니다.
  type?: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  showConfirmPassword?: boolean;
  passwordMatch?: boolean;
  readOnly?: boolean; // 읽기 전용 여부
  width: string;
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
}) => {
  return (
    <InputWrapper>
      <InputContainer hasError={!!error} width={width}>
        {" "}
        {/* width prop 전달 */}
        <Label>{label}</Label>
        <InputWrapperWithIcon>
          <Input
            type={type}
            value={value}
            onChange={onChange}
            hasError={!!error}
            readOnly={readOnly}
          />
          {passwordMatch && <CheckIcon src={checkIcon} alt="check" />}
          {onTogglePassword && type === "password" && !readOnly && (
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
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputContainer = styled.div<{ hasError: boolean; width?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.2em 1.5em;
  border-radius: 0.933rem;
  background-color: #000;
  border: 0.3px solid ${({ hasError }) => (hasError ? "#ff4d4f" : "#fff")};
  gap: 10px;
  position: relative;

  width: ${({ width }) => width || "100%"}; // customWidth를 사용하여 너비 조정
`;

const InputWrapperWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  flex: 1;
`;

const Label = styled.div`
  color: white;
  font-size: 16.66px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  width: 110px; /* 라벨 너비 고정 */
`;

const Input = styled.input<{ hasError: boolean }>`
  flex: 1;
  border: none;
  background-color: #000;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 16.66px;
  font-weight: 400;
  text-align: left;
  padding-right: 2rem; /* 아이콘의 너비만큼 여백 추가 */

  &:focus {
    outline: none;
  }

  &[readonly] {
    cursor: not-allowed;
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

export default InputWithLabel;
