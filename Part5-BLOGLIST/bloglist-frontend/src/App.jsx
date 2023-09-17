import { useEffect } from "react";
import Notification from "./components/Notification";
import SignedInUser from "./components/SignedInUser";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import { setNotification } from "./reducers/notificationReducer";
import { fetchBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { userChange } from "./reducers/userReducer";

const App = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userChange(user));
      blogService.setToken(user.token);
    }

    blogService
      .getAll()
      .then((initialBlogs) => dispatch(fetchBlogs(initialBlogs)));
  }, []);

  const loginForm = () => {
    return (
      <div>
        <LoginForm user={user} />
      </div>
    );
  };

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <SignedInUser name={user.name} setNotification={setNotification} />
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
