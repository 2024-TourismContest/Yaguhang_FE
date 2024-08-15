import { defaultApi } from "../core/index";

export const home = {
  place: async (stadium: string, category: string) => {
    try {
      const response = await defaultApi.get(
        `/api/main/place/${stadium}/${category}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching profile:", error);
      console.log(stadium, category);
      throw error;
    }
  },

  weatherGraphAPI: async (gameId: number, page = 1, size = 24) => {
    try {
      const response = await defaultApi.get('/api/main/weatherOfGame', {
        params: { gameId, page, size },
      });
      console.log(response.data);
      return response.data; // Adjust based on your response structure
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
},
}
