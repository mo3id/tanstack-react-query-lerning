import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Post } from "../types";
import axios from "axios";

const fetchData = async (id: string): Promise<Post> => {
  const response = await axios.get<Post>(
    `http://localhost:3005/posts/${id}`
  );
  return response.data;
};

const useGetPost = (
  id: string,
  paramType: string,
  paramKey: string
): UseQueryResult<Post> => {
  const queryClient = useQueryClient();

  let getCashedData: Post[] | undefined;

  if (paramType === "pagination") {
    getCashedData = queryClient.getQueryData([
      "posts",
      { paginate: +paramKey, selectedStatus: "all" },
    ]);
  } else {
    getCashedData = queryClient.getQueryData([
      "posts",
      "search",
      { q: paramKey },
    ]);
  }

  return useQuery({
    queryKey: ["post", { id: +id }],
    queryFn: () => fetchData(id),
    initialData: () => {
      if (!getCashedData) {
        return undefined;
      } else {
        const result = getCashedData.find((el) => el.id === +id);
        console.log(result);
        return result;
      }
    },
  });
};

export default useGetPost;
