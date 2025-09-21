import { useEffect, useState } from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import useSearch from "../hooks/useSearch";
import useUpdateRate from "../hooks/useUpdateRate";
import { fetchPosts } from "../hooks/useGetPosts";

import { PostStatusType } from "../types/index";
import { Table, Form, Button, ButtonGroup } from "react-bootstrap";
import useRemovePost from "../hooks/useRemovePost";

interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState(1);

  const queryClient = useQueryClient();

  const globalLoading = useIsFetching();

  const { data, isError, error, isStale, refetch } = useGetPosts(
    selectedPostStatus,
    paginate
  );

  const updateRate = useUpdateRate();

  const searchData = useSearch(searchQuery);

  const deleteAction = useRemovePost();
  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return;
    queryClient.prefetchQuery({
      queryKey: ["posts", { selectedStatus: "all", paginate: nextPage }],
      queryFn: () => fetchPosts("all", nextPage),
    });
  }, [paginate, queryClient]);

  if (globalLoading) {
    return <p>loading please wait</p>;
  }

  if (isError) {
    return <div>error: {error.message}</div>;
  }

  if (searchData.error) {
    return <div>error: {searchData.error.message}</div>;
  }

  return (
    <>
      {isStale && searchQuery.length === 0 ? (
        <Button onClick={() => refetch()} className="mb-3">
          Update Data
        </Button>
      ) : null}
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
            data?.map((el, idx) => (
              <tr key={el.id}>
                <td>{++idx}</td>
                <td>
                  <Link
                    to={`/info?id=${el.id}&type=pagination&key=${paginate}`}
                  >
                    {el.title}
                  </Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    onChange={(e) =>
                      updateRate.mutate({
                        postId: el.id,
                        rateValue: e.target.checked,
                        pageNumber: paginate,
                      })
                    }
                    checked={el.topRate}
                    disabled={selectedPostStatus !== "all"}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="danger"
                      onClick={() => deleteAction.mutate(el.id)}
                      disabled={selectedPostStatus != "all"}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}

          {searchQuery.length > 0 &&
            searchData.data?.map((el, idx) => (
              <tr key={el.id}>
                <td>{++idx}</td>
                <td>
                  <Link to={`/info?id=${el.id}&type=search&key=${searchQuery}`}>
                    {el.title}
                  </Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    onChange={() => console.log("")}
                    checked={el.topRate}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    {/* <Button
                      variant="success"
                      onClick={() => navigation("/edit")}
                    >
                      Edit
                    </Button> */}
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
