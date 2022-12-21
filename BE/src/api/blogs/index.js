import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import fs from "fs";
import httpErrors from "http-errors";
import { checkblogSchema, triggerBadRequest } from "./validator.js";

const { NotFound, Unauthorized, BadRequest } = httpErrors;

const blogsRouter = express.Router();

const blogsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogs.json"
);

const getBlogs = () => JSON.parse(fs.readFileSync(blogsJSONPath));
const writeBlogs = (blogsArray) =>
  fs.writeFileSync(blogsJSONPath, JSON.stringify(blogsArray));

//post

blogsRouter.post("/", checkblogSchema, triggerBadRequest, (req, res, next) => {
  try {
    const newBlog = { ...req.body, createdAt: new Date(), id: uniqid() };
    const blogsArray = getBlogs();
    blogsArray.push(newBlog);
    writeBlogs(blogsArray);
    res.status(201).send({ id: newBlog.id });
  } catch (error) {
    next(error);
  }
});
//get

blogsRouter.get("/", (req, res, next) => {
  try {
    const blogsArray = getBlogs();
    if (req.query && req.query.category) {
      const filteredBlogs = blogsArray.filter(
        (blog) => blog.category === req.query.category
      );
      res.send(filteredBlogs);
    } else {
      res.send(blogsArray);
    }
  } catch (error) {
    next(error);
  }
});
//get single blog

blogsRouter.get("/:blogId", (req, res, next) => {
  try {
    const blogs = getBlogs();
    const blog = blogs.find((blog) => blog.id === req.params.blogId);
    if (blog) {
      res.send(blog);
    } else {
      next(NotFound(`Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
//put

blogsRouter.put("/:blogId", (req, res, next) => {
  try {
    const blogs = getBlogs();

    const index = blogs.findIndex((blog) => blog.id === req.params.blogId);
    if (index !== -1) {
      const oldBlog = blogs[index];

      const updatedBlog = { ...oldBlog, ...req.body, updatedAt: new Date() };

      blogs[index] = updatedBlog;

      writeBlogs(blogs);
      res.send(updatedBlog);
    } else {
      next(NotFound(`Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

//delete

blogsRouter.delete("/:blogId", (req, res, next) => {
  try {
    const blogs = getBlogs();

    const remainingBlogs = blogs.filter(
      (blog) => blog.id !== req.params.blogId
    );

    if (blogs.length !== remainingBlogs.length) {
      writeBlogs(remainingBlogs);
      res.status(204).send();
    } else {
      next(NotFound(`Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
