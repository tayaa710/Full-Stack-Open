import { useEffect, useState } from "react"
import blogService from '../services/blogs'
import Blog from "./Blog"
import NewBlog from "./NewBlog"

const UserPage = ({setErrorMessage, user,setUser, setSuccessMessage}) => {
  const [blogs, setBlogs] = useState([])


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
        <h2>Create new blog</h2>
        <NewBlog user={user} setBlogs={setBlogs} blogs={blogs} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
      </div>
      {blogs.map(blog => {
        return(
          <Blog key={blog.id} blog={blog}/>
        )
      })}
    </div>
  )
}

export default UserPage