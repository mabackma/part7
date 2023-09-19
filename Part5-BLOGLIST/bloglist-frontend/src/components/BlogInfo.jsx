import { useParams, useNavigate } from "react-router-dom";
import blogService from "../services/blogs"
import userService from "../services/users";
import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { deleteBlog, increaseLike } from "../reducers/blogReducer";

const BlogInfo = ({ blogs, setNotification }) => {
  const { id } = useParams();

    // Convert the `id` to a string
    const idString = id.toString();
    const selectedBlog = blogs.find((n) => n.id === idString);

  const [creator, setCreator] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (selectedBlog) {
      try {
        const userId = selectedBlog.user.id;
        userService.getAll().then((users) => {
          const creator = users.find(u => u.id === userId);
          setCreator(creator ? creator.name : "unknown creator");
        });
      } catch {
        setCreator("unknown creator");
      }
    }
  }, [selectedBlog])
  
  const addLike = async (blog) => {
    const newBlogObject = {
      likes: blog.likes + 1,
    };

    blogService.update(newBlogObject, blog.id).then(updatedBlog => {
      dispatch(increaseLike(updatedBlog));
    })
  };

  const removeBlog = async (blog) => {
    const isRemoved = await blogService.removeOne(blog);

    if (isRemoved) {
      dispatch(deleteBlog(blogs, blog.id));
      dispatch(setNotification(`Deleted blog ${blog.title}`, 3));
      navigate('/')
    } else {
      dispatch(setNotification(`Failed to delete blog ${blog.title}`, 3));
      navigate('/')
    }
  };

  // Render only after selectedBlog gets a value
  return (
    <div>
      {selectedBlog ? (
        <>
          <h2>{selectedBlog.title} {selectedBlog.author}</h2>
          <p>
            <a href={selectedBlog.url} className="link">{selectedBlog.url}</a>
            <br></br>
            Likes: {selectedBlog.likes}&nbsp;
            <button onClick={() => addLike(selectedBlog)}>like</button>
            <br></br>
            Added by {creator}
          </p>
        </>
      ) : (
        <p>Blog not found</p>
      )}
      <div>
        <button onClick={() => removeBlog(selectedBlog)}>remove</button>
      </div>
    </div>
  );
};

export default BlogInfo;