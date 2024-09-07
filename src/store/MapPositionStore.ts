import { create } from "zustand";
import { Position } from "../components/map/map";

interface PositionState {
  position: Position | null; // 단일 Position 객체를 관리
  setPosition: (position: Position) => void; // Position 설정 함수
  clearPosition: () => void; // Position 초기화 함수
}

// Zustand store 생성 (단일 Position 관리)
const usePositionStore = create<PositionState>((set) => ({
  position: null, // 초기 단일 position 객체

  // 단일 Position 관리 함수들
  setPosition: (position) => set({ position }),
  clearPosition: () => set({ position: null }),
}));

export default usePositionStore;
