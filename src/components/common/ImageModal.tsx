import React from "react";
import styled from "styled-components";
import RightArrow from "../../assets/icons/arrow_right.svg";
import LeftArrow from "../../assets/icons/arrow_left.svg";
import CloseIcon from "../../assets/icons/x.png";

interface ImageModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  image,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <Icon src={CloseIcon} alt="Close" />
        </CloseButton>
        <NavButton onClick={onPrev} position="left">
          <Icon src={LeftArrow} alt="Previous" />
        </NavButton>
        <NavButton onClick={onNext} position="right">
          <Icon src={RightArrow} alt="Next" />
        </NavButton>
        <Image src={image} alt="Preview" />
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
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 50vw;
  max-height: 80vh;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const NavButton = styled.button<{ position: "left" | "right" }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ position }) => (position === "left" ? "50px" : "auto")};
  right: ${({ position }) => (position === "right" ? "50px" : "auto")};
  background: none;
  border: none;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const Image = styled.img`
  max-width: 100%;
`;

export default ImageModal;
