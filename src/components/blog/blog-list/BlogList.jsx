import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  return (
    <Row>
      {props.blogs.map((post) => (
        <Col
          key={post.id}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem blogs={post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
