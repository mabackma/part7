import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import SignedInUser from './components/SignedInUser'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log('logged out', user.name)
      setUser(null)   //The user state is now null because there is no user logged in
      blogService.setToken(null)
    } catch (exception) {
      setErrorMessage('Logout failed: ', exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          setErrorMessage={setErrorMessage}
          setUser={setUser}
        />
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <SignedInUser name={user.name} handleLogout={handleLogout}/>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage}/>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App