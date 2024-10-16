import { defaultApi } from "../core/index";
import { Schedule } from "../../components/home/Card";

const getAuthToken = () => localStorage.getItem("token") || "";

export const home = {
  checkFanTeam: async () => {
    try {
      const response = await defaultApi.get(`/api/users/check/fan-team`);
      return response.data;
    } catch (error) {
      console.error("Error fetching fan team status:", error);
      throw error;
    }
  },
  setDoNotShowAgain: async () => {
    try {
      await defaultApi.get(`/api/users/click/check-fan-team`);
    } catch (error) {
      console.error("Error setting 'Do not show again':", error);
      throw error;
    }
  },
  place: async (stadium: string, category: string) => {
    try {
      const response = await defaultApi.get(
        `/api/main/place/${stadium}/${category}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  bookmark: async (contentId: number, stadiumId: number) => {
    try {
      const response = await defaultApi.patch(
        `/api/scraps/spot?contentId=${contentId}&stadiumId=${stadiumId}`,
        null
      );
      return response;
    } catch (error) {
      console.error("북마크", error);
      throw error;
    }
  },

  weatherGraphAPI: async (gameId: number, page = 0, size = 24) => {
    try {
      const response = await defaultApi.get("/api/main/weatherOfGame", {
        params: { gameId, page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weatherGraph data:", error);
      throw error;
    }
  },
  weatherCardAPI: async (gameId: number) => {
    try {
      const response = await defaultApi.get("/api/main/weatherCardOfGame", {
        params: { gameId },
      })
      return response.data;
    } catch (error) {
      console.error("Error fetching weatherCard data:", error);
      throw error;
    }
  },
};

export const fetchSchedules = async (team: string): Promise<Schedule[]> => {
  const token = getAuthToken();
  try {
    const response = await defaultApi.get<{ schedules: Schedule[] }>(
      `/api/main/schedule/?team=${encodeURIComponent(team)}&page=0&size=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.schedules;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

export const scrapSchedule = async (gameId: number) => {
  const token = getAuthToken();
  try {
    console.log("Scrapping schedule for gameId:", gameId);
    const response = await defaultApi.patch<{}>(
      `/api/scraps/schedule/scrap?gameId=${gameId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data === "add scrap";
  } catch (error) {
    console.error("Error stamp:", error);
    throw error;
  }
};
