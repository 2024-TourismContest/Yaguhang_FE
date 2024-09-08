import { defaultApi } from "../core/index";

export const getSpotsByStadium = async (
  stadiumId: number,
  category: string,
  level: number,
  nowX: number,
  nowY: number
) => {
  try {
    const response = await defaultApi.get(
      `/api/spot/map/${stadiumId}/${category}/${level}/${nowX}/${nowY}`
    );

    return response;
  } catch (error) {
    console.error("Error scrapping schedule:", error);
    throw error;
  }
};
export const getStadiumCoordinate = async (stadiumId: number) => {
  try {
    const response = await defaultApi.get(`/api/stadiums/stadiumMap`, {
      params: { stadiumId },
    });

    return response.data;
  } catch (error) {
    console.error("Error scrapping schedule:", error);
    throw error;
  }
};
export const getplayerPick = async (
  stadiumId: number,
  level: number,
  nowX: number,
  nowY: number
) => {
  try {
    const response = await defaultApi.get(
      `/api/spot/map/${stadiumId}/${level}/${nowX}/${nowY}`
    );

    return response.data;
  } catch (error) {
    console.error("Error scrapping schedule:", error);
    throw error;
  }
};
