import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
const NewBlogPost = () => {
  const [text, setText] = useState("");

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" placeholder="Url"></Form.Control>
          <Form.Group>
            <Form.Label>Read Time</Form.Label>
            <Form.Control size="sm" placeholder="number"></Form.Control>
            <Form.Control size="sm" placeholder="unit"></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control size="sm" placeholder="name"></Form.Control>
            <Form.Control size="sm" placeholder="avatar url"></Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Comedy</option>
            <option>Non-fiction</option>
            <option>Fiction</option>
            <option>Political</option>
            <option>Tech</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
