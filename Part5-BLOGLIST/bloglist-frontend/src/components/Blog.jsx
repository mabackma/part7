import { useState, useRef } from "react";
import blogService from "../services/blogs";
import TogglableBlog from "./TogglableBlog";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogRef = useRef();

  const getUsername = () => {
    const userString = window.localStorage.getItem("loggedBlogappUser");
    if (userString === null) {
      return "";
    }
    const user = JSON.parse(userString);
    return user.name;
  };

  const dispatch = useDispatch();

  const addLike = async () => {
    const newBlogObject = {
      likes: blog.likes + 1,
    };

    const updatedBlog = await blogService.update(newBlogObject, blog.id);

    // Map over the previous blogs and update the specific blog that matches the id
    const updatedBlogs = blogs.map((prevBlog) =>
      prevBlog.id === updatedBlog.id ? updatedBlog : prevBlog,
    );

    // update the blogs state
    setBlogs(updatedBlogs);
  };

  const removeBlog = async () => {
    const isRemoved = await blogService.removeOne(blog);

    if (isRemoved) {
      // Filter the previous blogs without the deleted blog
      const updatedBlogs = blogs.filter((prevBlog) => prevBlog.id !== blog.id);
      // update the blogs state
      setBlogs(updatedBlogs);
      dispatch(setNotification(`Deleted blog ${blog.title}`, 3));
    } else {
      dispatch(setNotification(`Failed to delete blog ${blog.title}`, 3));
    }
  };

  return (
    <TogglableBlog
      buttonLabel="view"
      buttonLabelExit="hide"
      blogTitle={blog.title}
      blogAuthor={blog.author}
      ref={blogRef}
    >
      <div>{blog.url}</div>
      <div className="likes">
        likes {blog.likes}&nbsp;
        <button onClick={() => addLike()}>like</button>
      </div>
      <div>{getUsername()}</div>
      <div>
        <button onClick={() => removeBlog()}>remove</button>
      </div>
    </TogglableBlog>
  );
};

export default Blog;
