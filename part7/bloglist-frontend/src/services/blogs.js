import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const logout = (setUser) => {
  console.log
  token = null
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  console.log(response.data)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const blogId = blog.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogId}`,blog,config)
  return response.data
}

const deleteBlog = async (blog) => {
  const blogId = blog.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`,config)
}

export default { getAll, setToken, logout, createBlog, updateBlog, deleteBlog }