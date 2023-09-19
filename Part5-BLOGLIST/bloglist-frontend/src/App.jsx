import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import SignedInUser from "./components/SignedInUser";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import UsersInfo from "./components/UsersInfo";
import User from "./components/User";
import BlogInfo from "./components/BlogInfo";
import blogService from "./services/blogs";
import userService from "./services/users";
import { setNotification } from "./reducers/notificationReducer";
import { fetchBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { userChange } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState([]);

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

    userService.getAll().then((usersData) => {
      setUsers(usersData);
    });
  }, []);

  const loginForm = () => {
    return (
      <div>
        <LoginForm setPage={setPage} />
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

  const userForm = () => (
    <div>
      <h2>blogs</h2>
      <SignedInUser name={user.name} setNotification={setNotification} />
      <UsersInfo users={users} />
    </div>
  );

  // I will call this as a function to prevent re-rendering when adding a like
  const Home = () => (
    <div>
      <Notification />
      {user === null ? loginForm() : blogForm()}
    </div>
  );

  const Users = () => (
    <div>
      <Notification />
      {user === null ? loginForm() : userForm()}
    </div>
  );

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Routes>
        <Route
          path="/blogs/:id"
          element={<BlogInfo blogs={blogs} setNotification={setNotification} />}
        />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={Home()} />
      </Routes>
    </Router>
  );
};

export default App;
