import create from "zustand";

// 상태 타입 정의
interface BalloonState {
  showBalloon: boolean;
  balloonContent: string;
  setShowBalloon: (show: boolean, content?: string) => void;
}

// Zustand 스토어 생성
const useBalloonStore = create<BalloonState>((set) => ({
  showBalloon: false,
  balloonContent: "",
  setShowBalloon: (show, content = "") =>
    set({ showBalloon: show, balloonContent: content }),
}));

export default useBalloonStore;
