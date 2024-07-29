require("dotenv").config();
const blogRouter = require("express").Router();
const Blog = require("../models/blog.model");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blogId = await Blog.findById(request.params.id);
  response.json(blogId);
});

//POST
blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token;
  const user = request.user;

  console.log("user: ", user);
  console.log("body: ", body);

  const decodeToken = jwt.verify(token, process.env.SECRET);
  if (!(token || decodeToken.id)) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  console.log("token", decodeToken);
  // const user = User.findById(decodeToken.id);

  if (!body.url || !body.title) {
    return response.status(400).json({ error: "URL and title are required" });
  }
  const titleExisting = await Blog.findOne({ title: body.title });

  if (titleExisting) {
    return response.status(400).json({ error: "This title is being used" });
  }

  // const user = await User.findById(body.userId);

  const newBlog = await new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate("user", { username: 1, name: 1 });

  const blogSaved = await newBlog.save();
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();
  response.json(blogSaved);
});

//DELETE
blogRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const user = request.user;
  console.log("user", user);
  const decodeToken = jwt.verify(token, process.env.SECRET);

  if (!(token && decodeToken)) {
    return response.status(404).json({ error: "Token missing or invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.status(204).end();
  } else {
    response.status(401).json({ error: "Unautorized operation" });
  }
});

blogRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  console.log("comment: ", comment);
  try {
    const blog = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1,
    });

    blog.comments = blog.comments.concat(comment);

    const updateBlog = await blog.save();
    updateBlog
      ? response.status(200).json(updateBlog.JSON())
      : response.status(400).end();
  } catch (error) {}
});

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const id = request.params.id;

  // const likes = {
  //   likes: body.likes,
  // };

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
    }).populate("user", { username: 1, name: 1 });
    updateBlog
      ? response.status(200).json(updateBlog.toJSON())
      : response.status(400).json({ error: "Blog not found" });
  } catch (error) {
    response.status(500).json({ error: "Server internal error" });
  }
});

module.exports = blogRouter;
