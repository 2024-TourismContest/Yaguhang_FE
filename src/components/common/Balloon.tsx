import styled, { keyframes } from "styled-components";

interface BalloonProps {
  content: string;
  position?: { top: any; left: any };
}

const Balloon: React.FC<BalloonProps> = ({ content, position }) => {
  return (
    <BalloonContainer
      style={{ top: position?.top ?? 0, left: position?.left ?? 0 }}
    >
      {content}
      <BalloonArrow />
    </BalloonContainer>
  );
};

export default Balloon;

const float = keyframes`
  0% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-5px);
  }
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
`;

const BalloonContainer = styled.div`
  position: absolute;
  background-color: #fff;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  width: fit-content;
  animation: ${float} 1.5s ease-in-out infinite; // 동동 뜨는 애니메이션

  font-size: 0.8rem;
  font-weight: 500;
  color: #303030;
`;

const BalloonArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fff;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
`;
