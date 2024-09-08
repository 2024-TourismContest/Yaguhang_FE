import { create } from "zustand";

// 상태와 상태를 변경하는 함수들의 타입을 정의합니다.
interface TeamStore {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  selectedGame: { id: number; date: string; stadium: string } | null;
  setSelectedGame: (game: { id: number; date: string; stadium: string } | null) => void;
  stadiumId: number | null;
  setStadiumId: (id: number) => void;
}

// 스케줄의 타입을 정의.
interface Schedule {
  id: number;
  home: string;
  away: string;
  stadium: string;
  date: string;
  time: string;
  weather: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  weatherUrl: string;
  isScraped: boolean;
}

//상태 관리 스토어를 생성.
export const useTeamStore = create<TeamStore>((set) => ({
  selectedTeam: "전체", // 현재 선택된 팀을 저장하는 상태. 초기값=전체
  setSelectedTeam: (team: string) => set({ selectedTeam: team }), // 선택된 팀을 변경하는 함수.
  schedules: [], // 현재 표시할 스케줄 목록을 저장하는 상태.
  setSchedules: (schedules: Schedule[]) => set({ schedules }), // 스케줄 목록을 변경하는 함수.
  selectedGame: null,
  setSelectedGame: (game) => set({ selectedGame: game }), // 선택된 게임을 저장하는 함수.
  stadiumId: null, // 현재 선택된 경기장의 ID를 저장하는 상태.
  setStadiumId: (id: number) => set({ stadiumId: id }), // 경기장 ID를 변경하는 함수.
}));

export default useTeamStore;