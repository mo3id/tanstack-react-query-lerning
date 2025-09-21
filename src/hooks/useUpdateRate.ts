import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { Post, TopRatePost } from "../types";

const updateRate = async (rate: TopRatePost): Promise<Post> => {
  const result = await axios.patch<Post>(
    `https://json-server-api-production-fcb3.up.railway.app/posts/${rate.postId}`,
    { topRate: rate.rateValue }
  );
  return result.data;
};

const useUpdateRate = (): UseMutationResult<Post, AxiosError, TopRatePost> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRate,
    onMutate: (values) => {
      const oldData = queryClient.getQueryData([
        "posts",
        { paginate: values.pageNumber, selectedStatus: "all" },
      ]);

      queryClient.setQueryData(
        ["posts", { paginate: values.pageNumber, selectedStatus: "all" }],
        (prevState: Post[]) =>
          prevState.map((el) => {
            if (el.id === values.postId) {
              return { ...el, topRate: values.rateValue };
            } else {
              return el;
            }
          })
      );

      return () => {
        queryClient.setQueryData(
          ["posts", { paginate: values.pageNumber, selectedStatus: "all" }],
          oldData
        );
      };
    },
    onError: (_, __, rollBack) => {
      if (rollBack) {
        rollBack();
      }
    },
  });
};

export default useUpdateRate;
