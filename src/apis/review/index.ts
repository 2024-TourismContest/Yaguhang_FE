import { defaultApi } from "../core/index";

const getAuthToken = () => localStorage.getItem("token") || "";

// 리뷰 리스트 가져오는 함수
export const fetchReviews = async (contentId: number, sort: string = "new") => {
  try {
    const response = await defaultApi.get(`/api/review/${contentId}`, {
      params: { sort }, // 정렬 기준
    });
    return response.data.reviews; // 리뷰 리스트 반환
  } catch (error) {
    console.error("리뷰 리스트 가져오기 오류:", error);
    throw error;
  }
};

// 리뷰 삭제 함수
export const deleteReview = async (reviewId: number) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    await defaultApi.delete(`/api/review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
  } catch (error) {
    console.error("리뷰 삭제 중 오류 발생:", error);
    throw error;
  }
};

// 리뷰 수정 함수
export const updateReview = async (
  reviewId: number,
  updatedData: { content: string; star?: number; images?: string[] }
) => {
  const token = localStorage.getItem("token") || "";
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await defaultApi.put(
      `/api/review/${reviewId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("리뷰 수정 오류:", error);
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

// 서버로 좋아요 토글 요청
export const toggleLikeOnServer = async (reviewId: number) => {
  const token = getAuthToken();
  try {
    const response = await defaultApi.patch(
      `/api/review/${reviewId}/like`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      }
    );
    return response.data.likeCount;
  } catch (error) {
    console.error("좋아요 토글 중 오류 발생:", error);
    return null;
  }
};

// 이미지 업로드 함수
export const uploadToAws = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const token = getAuthToken();

  try {
    const response = await defaultApi.post("/api/aws", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // 통일된 토큰 방식 사용
      },
    });
    return response.data; // 업로드된 이미지 URL 반환
  } catch (error) {
    console.error("파일 업로드 오류:", error);
    throw error;
  }
};
