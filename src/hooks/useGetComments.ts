import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommentResponse } from "../types";

const fetchData = async (post_id: string): Promise<CommentResponse[]> => {
  const result = await axios.get<CommentResponse[]>(
    `http://localhost:3005/comments?post_id=${post_id}&_sort=id&_order=desc`
  );

  return result.data;
};

const useGetComments = (post_id: string): UseQueryResult<CommentResponse[]> => {
  return useQuery({
    queryKey: ["comments", { post_id: +post_id }],
    queryFn: () => fetchData(post_id),
  });
};

export default useGetComments;
