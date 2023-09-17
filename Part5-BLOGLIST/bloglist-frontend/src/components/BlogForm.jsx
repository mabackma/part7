import { useState, useRef } from "react";
import blogService from "../services/blogs";
import Blog from "../components/Blog";
import lodash from "lodash";
import TogglableCreate from "./TogglableCreate";
import { setNotification } from "../reducers/notificationReducer";
import { newBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogForm = ({ blogs }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const createBlog = async (event) => {
    blogFormRef.current.toggleVisibility();
    event.preventDefault();

    // A new blog. The backend handles the 'likes' and 'user' properties.
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    try {
      const createdBlog = await blogService.create(newBlogObject);
      console.log("created blog", blogTitle);
      setBlogTitle("");
      setBlogAuthor("");
      setBlogUrl("");
      dispatch(
        setNotification(`a new blog ${blogTitle} by ${blogAuthor} added`, 3),
      );
      // Update blogs state
      dispatch(newBlog(createdBlog));
    } catch (exception) {
      dispatch(
        setNotification(`Failed creating blog: ${exception.message}`, 3),
      );
    }
  };

  // Sort the blogs array by likes in descending order
  const sortedBlogs = lodash.orderBy(blogs, ["likes"], ["desc"]);

  return (
    <div>
      <TogglableCreate
        buttonLabel="create new blog"
        buttonLabelExit="cancel"
        ref={blogFormRef}
      >
        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              type="text"
              value={blogTitle}
              name="Title"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={blogAuthor}
              name="Author"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={blogUrl}
              name="Url"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </TogglableCreate>

      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} />
      ))}
    </div>
  );
};

export default BlogForm;
