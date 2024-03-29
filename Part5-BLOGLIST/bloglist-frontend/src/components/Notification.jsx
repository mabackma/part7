import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const notificationStyle = {
    color: "purple",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: notification ? "block" : "none",
  };

  return (
    <div style={notificationStyle} className="error">
      {notification}
    </div>
  );
};

export default Notification;
