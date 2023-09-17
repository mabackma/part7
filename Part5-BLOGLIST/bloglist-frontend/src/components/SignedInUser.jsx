import { useDispatch } from "react-redux";
import { userChange } from "../reducers/userReducer";
import blogService from "../services/blogs";

const SignedInUser = ({ name, setNotification }) => {
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      console.log("logged out", name);
      dispatch(userChange(null)); //The user state is now null because there is no user logged in
      blogService.setToken(null);
    } catch (exception) {
      dispatch(setNotification(`Logout failed: ${exception.message}`, 3));
    }
  };

  return (
    <div className="signedIn">
      {name} logged in <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
    </div>
  );
};

export default SignedInUser;
