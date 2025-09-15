import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post } from "../types";
const fetchData = async (q: string): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    `http://localhost:3005/posts?q=${q}`
  );
  return response.data;
};
const useSearch = (q: string): UseQueryResult<Post[]> => {
  console.log(q);
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0,
  });
};

export default useSearch;
