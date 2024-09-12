import { defaultApi } from "../core/index";

const getAuthToken = () => localStorage.getItem("token") || "";

// 리뷰 리스트 가져오는 함수
export const fetchReviews = async (contentId: number, sort: string = "new") => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await defaultApi.get(`/api/review/${contentId}`, {
      params: {
        sort: sort, // 정렬 기준
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.reviews; // 리뷰 리스트 반환
  } catch (error) {
    console.error("리뷰 리스트 가져오기 오류:", error);
    throw error;
  }
};

// 리뷰 작성 함수
export const postReview = async (
  contentId: number,
  reviewData: {
    star: number;
    content: string;
    images: string[];
    stadiumId: number;
  }
) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await defaultApi.post(
      `/api/review/${contentId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("리뷰 작성 오류:", error);
    throw error;
  }
};
