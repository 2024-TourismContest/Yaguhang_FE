import styled from "styled-components";

interface ModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>{content}</ModalBody>
        <ButtonContainer>
          <Button onClick={onConfirm}>확인</Button>
          <Button onClick={onCancel}>취소</Button>
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

const ModalBody = styled.p`
  margin-bottom: 2rem;
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
