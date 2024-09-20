import { create } from "zustand";

interface ModalConfig {
  title: string;
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showDoNotShowAgain?: boolean;
  onDoNotShowAgain?: (doNotShowAgain: boolean) => void;
  showConfirm?: boolean;
  showCancel?: boolean;
}

interface ModalStore {
  isOpen: boolean;
  config: ModalConfig;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  config: {
    title: "",
    content: "",
    showConfirm: true,
    showCancel: false,
  },
  modalRef: null,
  openModal: (config: ModalConfig) => set({ isOpen: true, config }),
  closeModal: () =>
    set({ isOpen: false, config: { title: "", content: "" }, modalRef: null }),
}));

export default useModalStore;
