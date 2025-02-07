import { useEffect, useState, useRef } from "react"
import blogService from '../services/blogs'
import Blog from "./Blog"
import NewBlog from "./NewBlog"
import Togglable from './Togglable'

const UserPage = ({ setErrorMessage, user, setUser, setSuccessMessage }) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const importedBlogs = await blogService.getAll()

        setBlogs(importedBlogs)
      } catch (exception) {
        console.log(exception)
        setErrorMessage('Error loading blogs')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div>
      <div>
        <h1>Blogs</h1>
        <h2>Logged in as {user.name} <button onClick={() => blogService.logout(setUser)}>logout</button></h2>
      </div>
      <div>
        
        <Togglable showButtonLabel='New blog' hideButtonLabel="Cancel" ref={blogFormRef}>
        <h2>Create new blog</h2>
          <NewBlog user={user} setBlogs={setBlogs} blogs={blogs} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} toggleVisibility={() => blogFormRef.current.toggleVisibility()}/>
        </Togglable>
      </div>
      {blogs.map(blog => {
        return (
          <Blog key={blog.id} blog={blog} />
        )
      })}
    </div>
  )
}

export default UserPage