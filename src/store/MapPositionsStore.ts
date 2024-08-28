import { create } from "zustand";
import { Position } from "../components/map/map";

interface PositionState {
  positions: Position[];
  setPositions: (positions: Position[]) => void;
  addPosition: (position: Position) => void;
  removePosition: (contentId: number) => void;
  clearPositions: () => void;
}

const usePositionsStore = create<PositionState>((set) => ({
  positions: [],
  setPositions: (positions) => set({ positions }),
  addPosition: (position) =>
    set((state) => ({
      positions: [...state.positions, position],
    })),
  removePosition: (contentId) =>
    set((state) => ({
      positions: state.positions.filter((p) => p.contentId !== contentId),
    })),
  clearPositions: () => set({ positions: [] }),
}));

export default usePositionsStore;
