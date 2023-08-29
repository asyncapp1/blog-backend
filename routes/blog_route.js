import express from "express";
import {
  addblog,
  blog,
  deleteBlog,
  getBlogByID,
  updateBlog,
} from "../controllers/blog_controller";

const blogRoute = express.Router();
blogRoute.get("/", blog);
blogRoute.get("/:id", getBlogByID);
blogRoute.post("/addblog", addblog);
blogRoute.put("/update/:id", updateBlog),
blogRoute.delete("/delete/:id", deleteBlog);

export default blogRoute;
