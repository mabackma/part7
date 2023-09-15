// Shows create and update notifications in green. Shows errors in red.
const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'purple',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className="error">
      {message}
    </div>
  )
}

export default Notification