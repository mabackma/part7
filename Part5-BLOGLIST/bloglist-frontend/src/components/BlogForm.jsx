import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import lodash from 'lodash'
import TogglableCreate from './TogglableCreate'

const BlogForm = ({ blogs, setBlogs, setErrorMessage }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const blogFormRef = useRef()

  const createBlog = async (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()

    // A new blog. The backend handles the 'likes' and 'user' properties.
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      const createdBlog = await blogService.create(newBlogObject)
      console.log('created blog', blogTitle)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setErrorMessage(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogs(blogs.concat(createdBlog))   // Update blogs state
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(`Failed creating blog: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  // Sort the blogs array by likes in descending order
  const sortedBlogs = lodash.orderBy(blogs, ['likes'], ['desc'])

  return (
    <div>
      <TogglableCreate buttonLabel="create new blog" buttonLabelExit="cancel" ref={blogFormRef} >
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

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage}/>
      )}
    </div>
  )
}

export default BlogForm