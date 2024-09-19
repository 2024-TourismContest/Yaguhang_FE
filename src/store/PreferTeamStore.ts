import { create } from "zustand";

interface TeamState {
  isTeamSelectorActive: boolean;
  preferTeam: string;
  setTeamSelectorActive: (active: boolean) => void;
  setPreferTeam: (team: string) => void;
}

const useStore = create<TeamState>((set) => ({
  isTeamSelectorActive: false,
  preferTeam: "롯데",
  setTeamSelectorActive: (active) => set({ isTeamSelectorActive: active }),
  setPreferTeam: (team) => set({ preferTeam: team }),
}));

export default useStore;
