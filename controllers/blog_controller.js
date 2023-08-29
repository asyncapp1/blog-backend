import blog_model from "../models/blog_model";
import user_model from "../models/user_model";
import mongoose from "mongoose";

export const blog = async (req, res, next) => {
  let allblogs;

  try {
    allblogs = await blog_model.find();
  } catch (err) {
    print(`-------------------->${err}`);
  }

  return res.status(200).json({ allblogs });
};

export const getBlogByID = async (req, res, next) => {
  const blogID = req.params.id;
  let blog;
  try {
    blog = await blog_model.findById(blogID);
  } catch (err) {
    return res.status(400).json({ message: `=-------${err}` });
  }
  return res.status(200).json({ blog });
};

export const addblog = async (req, res, next) => {
  const { titel, descreption, image, dateAndTime, user } = req.body;

  let exesUser;

  console.log(`---->1`);
  try {
    exesUser = await user_model.findById(user);
    console.log(`---->2`);
  } catch (err) {
    console.log(`==============> ${err}`);
  }
  console.log(`---->3`);
  if (!exesUser) {
    return res
      .status(400)
      .json({ message: "you no have acc. yet, go on singup page" });
  }
  console.log(`---->4`);
  const newblog = new blog_model({
    titel,
    descreption,
    image,
    dateAndTime,
    user,
  });
  console.log(`---->5`);
  try {
    console.log(`---->6`);
    const session = await mongoose.startSession();
    console.log(`---->7`);
    session.startTransaction();
    console.log(`---->8`);
    await newblog.save({ session });
    console.log(`---->9`);
    exesUser.blog.push(newblog);
    console.log(`---->10`);
    await exesUser.save({ session });
    console.log(`---->11`);
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  res.status(200).json({ message: "your blog is saved" });
};

export const updateBlog = async (req, res, next) => {
  const blogID = req.params.id;
  const { titel, descreption, image, dateAndTime } = req.body;
  try {
    await blog_model.findByIdAndUpdate(blogID, {
      titel,
      descreption,
      image,
      dateAndTime,
    });
  } catch (err) {
    return res.status(500).json({ message: `=-------${err}` });
  }
  return res.status(200).json({ message: `blog is update` });
};

export const deleteBlog = async (req, res, next) => {
  const blogID = req.params.id;
  let blog;
  try {
    blog = await blog_model.findByIdAndRemove(blogID).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();
  } catch (err) {
    return res.status(500).json({ message: `=-------${err}` });
  }
  return res.status(200).json({ message: `your blog is deleted` });
};
