const SignedInUser = ({ name, handleLogout }) => {
  return (
    <div className="signedIn">
      {name} logged in <button onClick={handleLogout}>Logout</button>
      <br /><br />
    </div>
  )
}

export default SignedInUser