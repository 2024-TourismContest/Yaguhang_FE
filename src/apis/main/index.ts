import { defaultApi } from "../core/index";
import { Schedule } from "../../components/home/Card";

export const home = {
  place: async (stadium: string, category: string) => {
    try {
      const response = await defaultApi.get(
        `/api/main/place/${stadium}/${category}`
      );
      return response;
    } catch (error) {
      console.error("카테고리별추천 에러", error);
      throw error;
    }
  },
  bookmark: async (contentId: number, stadiumId: number) => {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await defaultApi.patch(
        `/api/scraps/spot?contentId=${contentId}&stadiumId=${stadiumId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 여기에 넣으세요
            accept: "*/*",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("북마크", error);
      throw error;
    }
  },
};

export const fetchSchedules = async (team: string): Promise<Schedule[]> => {
  const token = localStorage.getItem("token") || "";
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
  const token = localStorage.getItem("token") || "";
  try {
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
    console.error("Error scrapping schedule:", error);
    throw error;
  }
};
