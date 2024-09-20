import styled from "styled-components";
import { useState } from "react";

interface ModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  onDoNotShowAgain?: (doNotShowAgain: boolean) => void;
  showDoNotShowAgain?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onConfirm,
  onCancel,
  onDoNotShowAgain,
  showDoNotShowAgain = false,
}) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleConfirm = () => {
    if (onDoNotShowAgain) {
      onDoNotShowAgain(doNotShowAgain);
    }
    onConfirm();
  };

  const handleCancel = () => {
    if (onDoNotShowAgain) {
      onDoNotShowAgain(doNotShowAgain);
    }
    onCancel();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>
          <p>{content}</p>
          {showDoNotShowAgain && (
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={doNotShowAgain}
                onChange={() => setDoNotShowAgain(!doNotShowAgain)}
              />
              <CheckboxLabel>다시 보지 않기</CheckboxLabel>
            </CheckboxContainer>
          )}
        </ModalBody>
        <ButtonContainer>
          <Button onClick={handleConfirm}>확인</Button>
          <Button onClick={handleCancel}>취소</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  margin-bottom: 2rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem; /* 14px */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #686868;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #404040;
  }
`;

export default Modal;
