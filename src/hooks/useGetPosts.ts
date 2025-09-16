import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostStatusType } from "../types";

export const fetchPosts = async (
  selectedStatus: PostStatusType,
  paginate: number
): Promise<Post[]> => {
  if (selectedStatus == "all") {
    const result = await axios.get<Post[]>(
      `http://localhost:3005/posts?_page=${paginate}&_limit=5`
    );
    return result.data;
  } else {
    const result = await axios.get<Post[]>(
      `http://localhost:3005/posts?status=${selectedStatus}`
    );
    return result.data;
  }
};
const useGetPosts = (
  selectedStatus: PostStatusType,
  paginate: number
): UseQueryResult<Post[]> => {
  const query = useQuery<Post[], Error>({
    queryKey: ["posts", selectedStatus, paginate],
    queryFn: () => fetchPosts(selectedStatus, paginate),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });

  return query;
};

export default useGetPosts;
