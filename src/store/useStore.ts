import { create } from "zustand";

// 상태와 상태를 변경하는 함수들의 타입을 정의합니다.
interface ClubStore {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
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
const useStore = create<ClubStore>((set) => ({
  selectedTeam: "전체", // 현재 선택된 팀을 저장하는 상태.
  setSelectedTeam: (team: string) => set({ selectedTeam: team }), // 선택된 팀을 변경하는 함수.
  schedules: [], // 현재 표시할 스케줄 목록을 저장하는 상태.
  setSchedules: (schedules: Schedule[]) => set({ schedules }), // 스케줄 목록을 변경하는 함수.
}));

export default useStore;
