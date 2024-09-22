// /api/scraps/spot 응답
export interface Spot {
  contentId: number;
  image: string;
  title: string;
}

export interface StadiumInfo {
  StadiumId: number;
  StadiumImage: string;
  teamName: string;
  StadiumName: string;
}

export interface ScrapSpot {
  [x: string]: string;
  image: string;
  title: string;
}

export interface MyBookMarkResponse {
  scrapSpots: ScrapSpot[];
}
// /api/mypage/info 응답
export interface MyPageInfo {
  fanTeamName: string;
  nickname: string;
  image: string;
  fanTeam: string;
}

// /api/review/myreview 응답
export interface Review {
  stadiumId: number;
  spotId: number;
  reviewId: number;
  star: number;
  likeCount: number;
  isLiked: boolean;
  image: string;
  createdAt: string;
  content: string;
}

export interface MyReviewResponse {
  reviews: Review[];
}

// /api/scraps/schedule 응답
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

// /api/recommend/myrecommend 응답
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
// /api/users
export interface EditProfileParams {
  nickname: string;
  profileImage: string;
}
