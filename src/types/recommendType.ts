//api request
export interface recommendRequestType {
  pagdIndex: number;
  pageSize: number;
  order: string;
  filter: string;
}
export interface RecommendResponse {
  hasNextPage: boolean;
  pagesize: number;
  totalPage: number;
  recommendPreviewDtos: RecommendPreviewDto[];
}
export type RecommendPreviewDto = {
  recommendId: number;
  stadiumName: string;
  authorName: string;
  profileImage: string;
  title: string;
  createdAt: string;
  images: string[];
  likes: number;
  isMine: boolean;
  isLiked: boolean;
  stadiumId: number;
  likeTeam: string;
  likeTeamUrl: string;
  description?: string;
};
export interface SpotGeneralPreviewDto {
  contentId: number;
  name: string;
  address: string;
  imageUrl: string;
  isScraped: boolean;
  category: string;
}

export interface RecommendDetailResponse {
  recommendId: number;
  authorName: string;
  profileImage: string;
  title: string;
  createdAt: string;
  likes: number;
  isMine: boolean;
  isLiked: boolean;
  spotGeneralPreviewDtos: SpotGeneralPreviewDto[];
}
