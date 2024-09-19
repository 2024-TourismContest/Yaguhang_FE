// Type for /api/mypage/info response
export interface MyPageInfo {
  userId: number;
  nickname: string;
  image: string;
  fanTeam: string;
}

// Type for /api/review/myreview response
export interface Review {
  spotId: number;
  reviewId: number;
  star: number;
  likeCount: number;
  image: string;
  createdAt: string;
  content: string;
}

export interface MyReviewResponse {
  reviews: Review[];
}

// Type for /api/scraps/schedule response
export interface ScrappedSchedule {
  id: number;
  home: string;
  homeTeamLogo: string;
  away: string;
  awayTeamLogo: string;
  stadium: string;
  date: string;
  time: string;
  weather: string;
  weatherUrl: string;
  isScraped: boolean;
}

export interface ScrapsScheduleResponse {
  pageIndex: number;
  pageSize: number;
  scrappedSchedules: ScrappedSchedule[];
}

// Type for /api/recommend/myrecommend response
export interface RecommendPreviewDto {
  recommendId: number;
  stadiumId: number;
  stadiumImage: string;
  stadiumName: string;
  authorName: string;
  profileImage: string;
  likeTeam: string;
  likeTeamUrl: string;
  title: string;
  createdAt: string;
  images: string[];
  likes: number;
  isMine: boolean;
  isLiked: boolean;
}

export interface MyRecommendResponse {
  hasNextPage: boolean;
  pageSize: number;
  totalPage: number;
  recommendPreviewDtos: RecommendPreviewDto[];
}
