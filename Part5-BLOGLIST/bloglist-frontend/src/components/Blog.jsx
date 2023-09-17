import { useRef } from "react";
import blogService from "../services/blogs";
import TogglableBlog from "./TogglableBlog";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, increaseLike } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog, blogs }) => {
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
    dispatch(increaseLike(updatedBlog));
  };

  const removeBlog = async () => {
    const isRemoved = await blogService.removeOne(blog);

    if (isRemoved) {
      dispatch(deleteBlog(blogs, blog.id));
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
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
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
