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
    onMutate: (data) => {
      const savedComments = queryClint.getQueryData([
        "comments",
        { post_id: data.post_id },
      ]);
      const newComment = { ...data, id: new Date() };

      queryClint.setQueryData(
        ["comments", { post_id: data.post_id }],
        (comments: CommentResponse[]) => {
          return [newComment, ...comments];
        }
      );
      return () => {
        queryClint.setQueryData(
          ["comments", { post_id: data.post_id }],
          savedComments
        );
      };
    },
    onError: (_, __, rollBack) => {
      if (rollBack) {
        rollBack();
      }
    },
    onSuccess() {
      queryClint.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
