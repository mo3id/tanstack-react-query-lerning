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
}
