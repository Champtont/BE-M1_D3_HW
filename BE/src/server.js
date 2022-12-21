import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./api/authors/index.js";
import blogsRouter from "./api/blogs/index.js";
import {
  genericErrorHandler,
  unAuthorizedHandler,
  notFoundHandler,
  badRequestHandler,
} from "./errorhandler.js";

const server = express();
const port = 3002;

server.use(cors());
server.use(express.json());

//endpoints
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);

//Error handlers go under the routes
server.use(notFoundHandler);
server.use(unAuthorizedHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`console is running on port: ${port}`);
});
