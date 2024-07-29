import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../Services/blogs.services";
import { createNotification } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBLog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      const { id } = newBlog;
      return state.map((blog) => (blog.id !== id ? blog : newBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { setBlogs, appendBLog, updateBlog, removeBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsServices.create(blog);
      dispatch(appendBLog(newBlog));
      dispatch(
        createNotification(
          { message: `new blog "${blog.title}" added`, type: "success" },
          5
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(
        createNotification(
          {
            message: error.response && error.response.data.error,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export const addLike = (id, blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogsServices.update(id, blog);
      dispatch(updateBlog(likedBlog));
      dispatch(
        createNotification(
          { message: `${blog.title} by ${blog.author} liked`, type: "success" },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          {
            message: error.response && error.response.data.error,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const { id } = blog;
      const updateBlog = blogsServices.remove(id);
      dispatch(removeBlog(updateBlog));
      dispatch(
        createNotification(
          {
            message: `"${blog.title}" by ${blog.author} removed`,
            type: "success",
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          {
            message: error.response && error.response.data.error,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentBlog = await blogsServices.addComment(id, comment);
      dispatch(updateBlog(commentBlog));
      dispatch(
        createNotification(
          {
            message: `your comment "${comment}" added`,
            type: "info",
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          {
            message: error.response && error.response.data.error,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export default blogsSlice.reducer;
