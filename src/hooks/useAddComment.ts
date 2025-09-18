import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentPost, CommentResponse } from "../types";

const requestData = async (data: CommentPost): Promise<CommentResponse> => {
  const result = await axios.post<CommentResponse>(
    "http://localhost:3005/comments",
    data
  );
  return result.data;
};

const useAddComment = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentPost
> => {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: requestData,
    onSuccess() {
      queryClint.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
