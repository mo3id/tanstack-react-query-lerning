import { Link } from "react-router-dom";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { useQueryClient } from "@tanstack/react-query";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { PostLIstProps } from "../types";
import useSearch from "../hooks/useSearch";
import { useEffect, useState } from "react";
const PostList = ({ selectedPostStatus, searchQuery }: PostLIstProps) => {
  const [paginate, setPaginate] = useState(1);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data, isStale, refetch } = useGetPosts(
    selectedPostStatus,
    paginate
  );
  const searchData = useSearch(searchQuery);

  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage >= 3) return;

    queryClient.prefetchQuery({
      queryKey: ["posts", { paginate: nextPage, selectedPostStatus: "all" }],
      queryFn: () => fetchPosts("all", nextPage),
    });
  }, [paginate, queryClient]);

  if (isLoading || searchData.isLoading) {
    return <div>Data is loading...</div>;
  }
  if (isError) {
    return (
      <div>
        Ther is an Error!!!
        <br />
        {error.message}
      </div>
    );
  }
  if (searchData.error) {
    return (
      <div>
        Ther is an Error!!!
        <br />
        {searchData.error.message}
      </div>
    );
  }
  return (
    <>
      {isStale && searchQuery.length === 0 && (
        <Button onClick={() => refetch()} className="mb-3">
          Update Data
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery.length === 0 &&
            data?.map((ele, idx) => (
              <tr key={ele.id}>
                <td>{++idx}</td>
                <td>
                  <Link to={`/info?id=${ele.id}&type=paginate&key=${paginate}`}>
                    {ele.title}
                  </Link>
                </td>
                <td>{ele.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    checked={ele.topRate}
                    onChange={(e) => console.log(e.target)}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          {searchQuery.length > 0 &&
            searchData.data?.map((ele, idx) => (
              <tr key={ele.id}>
                <td>{++idx}</td>
                <td>
                  <Link
                    to={`/info?id=${ele.id}&type=search&key=${searchQuery}`}
                  >
                    {ele.title}
                  </Link>
                </td>
                <td>{ele.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    checked={ele.topRate}
                    onChange={(e) => console.log(e.target)}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {searchQuery.length === 0 && selectedPostStatus === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;
