import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import { useState, useEffect } from "react";
import "./styles.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:3002/blogs/`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBlogs(data);
      } else {
        alert("error fetching blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Strive Blog!</h1>
      <BlogList blogs={blogs} />
    </Container>
  );
};

export default Home;
