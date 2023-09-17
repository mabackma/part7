import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import SignedInUser from "./components/SignedInUser";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import { setNotification } from "./reducers/notificationReducer";
import { fetchBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => dispatch(fetchBlogs(initialBlogs)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      console.log("logged out", user.name);
      setUser(null); //The user state is now null because there is no user logged in
      blogService.setToken(null);
    } catch (exception) {
      dispatch(setNotification(`Logout failed: ${exception.message}`, 3));
    }
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm setUser={setUser} />
      </div>
    );
  };

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <SignedInUser name={user.name} handleLogout={handleLogout} />
      <BlogForm blogs={blogs} />
    </div>
  );

  return (
    <div>
      <Notification />
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
