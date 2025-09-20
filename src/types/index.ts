export interface Post {
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export type PostStatusType = "publish" | "draft" | "block" | "all";

export interface PostFilterProps {
  selectedPostStatus: PostStatusType;
  setselectedPostStatus: (value: PostStatusType) => void;
}

export interface PostLIstProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}
export interface SearchQueryProps {
  setSearchQuery: (value: string) => void;
}

export interface CommentPost {
  body: string;
  post_id: number;
}

export interface CommentResponse {
  id: number;
  body: string;
  post_id: number;
}

export interface TopRatePost {
  postId: number;
  rateValue: boolean;
  pageNumber: number;
}
