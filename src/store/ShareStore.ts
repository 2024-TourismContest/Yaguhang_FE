import create from "zustand";

interface ShareState {
  isSharePopupOpen: boolean;
  openSharePopup: () => void;
  closeSharePopup: () => void;
}

export const useShareStore = create<ShareState>((set) => ({
  isSharePopupOpen: false,
  openSharePopup: () => set({ isSharePopupOpen: true }),
  closeSharePopup: () => set({ isSharePopupOpen: false }),
}));
