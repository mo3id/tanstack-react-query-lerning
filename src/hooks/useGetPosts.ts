import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostStatusType } from "../types";

const fetchPosts = async (selectedStatus: PostStatusType): Promise<Post[]> => {
  if (selectedStatus == "all") {
    const result = await axios.get<Post[]>("http://localhost:3005/posts");
    return result.data;
  } else {
    const result = await axios.get<Post[]>(
      `http://localhost:3005/posts?status=${selectedStatus}`
    );
    return result.data;
  }
};
const useGetPosts = (
  selectedStatus: PostStatusType
): UseQueryResult<Post[]> => {
  const query = useQuery<Post[], Error>({
    queryKey: ["posts", selectedStatus],
    queryFn: () => fetchPosts(selectedStatus),
    staleTime: 1000 * 10,
  });
  
  return query;
};

export default useGetPosts;
