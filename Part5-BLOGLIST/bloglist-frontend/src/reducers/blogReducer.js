import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    fetchBlogs(state, action) {
      return action.payload;
    },
    newBlog(state, action) {
      state.push(action.payload);
    },
    increaseLike(state, action) {
      const updatedBlog = action.payload;
      const blogIndex = state.findIndex((blog) => blog.id === updatedBlog.id);
      if (blogIndex !== -1) {
        state[blogIndex] = updatedBlog;
      }
    },
  },
});

export const deleteBlog = (blogs, id) => {
  return (dispatch) => {
    const remainingBlogs = blogs.filter((prevBlog) => prevBlog.id !== id);
    dispatch(fetchBlogs(remainingBlogs));
  };
};

export const { fetchBlogs, newBlog, increaseLike } = blogSlice.actions;
export default blogSlice.reducer;
