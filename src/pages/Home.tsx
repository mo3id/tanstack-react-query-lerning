import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { PostStatusType } from "../types";

const Home = () => {
  const [selectedPostStatus, setselectedPostStatus] =
    useState<PostStatusType>("all");
  return (
    <Row>
      <Col xs={9}>
        <PostList selectedPostStatus={selectedPostStatus} />
      </Col>
      <Col>
        <PostFilter
          selectedPostStatus={selectedPostStatus}
          setselectedPostStatus={setselectedPostStatus}
        />
      </Col>
    </Row>
  );
};

export default Home;
