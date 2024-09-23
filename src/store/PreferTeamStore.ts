import { create } from "zustand";

interface TeamState {
  isTeamSelectorActive: boolean;
  preferTeam: string;
  setTeamSelectorActive: (active: boolean) => void;
  setPreferTeam: (team: string) => void;
}

const useTeamStore = create<TeamState>((set) => ({
  isTeamSelectorActive: false,
  preferTeam: "",
  setTeamSelectorActive: (active) => set({ isTeamSelectorActive: active }),
  setPreferTeam: (team) => set({ preferTeam: team }),
}));

export default useTeamStore;
