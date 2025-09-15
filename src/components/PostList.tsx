import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { PostLIstProps } from "../types";
import useSearch from "../hooks/useSearch";
const PostList = ({ selectedPostStatus, searchQuery }: PostLIstProps) => {
  const { isLoading, isError, error, data } = useGetPosts(selectedPostStatus);
  console.log(selectedPostStatus);
  const searchData = useSearch(searchQuery);
  console.log(searchQuery);
  console.log(searchData);
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
  if (searchData.isError) {
    return (
      <div>
        Ther is an Error!!!
        <br />
        {searchData.error.message}
      </div>
    );
  }
  return (
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
                <Link to="/info">{ele.title}</Link>
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
                <Link to="/info">{ele.title}</Link>
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
  );
};

export default PostList;
