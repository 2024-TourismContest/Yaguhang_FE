//api request
export interface recommendRequestType {
  pagdIndex: number;
  pageSize: number;
  order: string;
  filter: string;
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
};

export type RecommendResponse = {
  hasNextPage: boolean;
  pageSize: number;
  recommendPreviewDtos: RecommendPreviewDto[];
};
