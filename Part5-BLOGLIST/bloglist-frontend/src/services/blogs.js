import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogId}`, newObject, config)
  return response.data
}

const removeOne = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

  if(confirmed) {
    try {
      await axios.delete(`${baseUrl}/${blog.id}`, config)
      return true
    } catch (error) {
      return false
    }
  }
  return false
}

export default { getAll, create, update, removeOne, setToken }