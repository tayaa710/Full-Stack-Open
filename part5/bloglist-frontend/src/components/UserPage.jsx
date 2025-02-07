import { useEffect, useState, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import NewBlog from './NewBlog'
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ✅ Ignore warning since setErrorMessage is stable

  //STYLES
  const pageStyle = {
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

  const blogSorter = (a,b) => {
    if (a.likes > b.likes){
      return -1
    }else if (a.likes < b.likes){
      return 1
    }else{
      return 0
    }
  }
  // END STYLES
  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1>Blogs</h1>
        <h2>Logged in as {user.username} <button style={buttonStyle} onClick={() => blogService.logout(setUser)}>logout</button></h2>
      </div>
      <div>

        <Togglable showButtonLabel='➕ New Blog' hideButtonLabel='❌ Cancel' ref={blogFormRef}>
          <h2>Create new blog</h2>
          <NewBlog setBlogs={setBlogs} blogs={blogs} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
        </Togglable>
      </div>
      {blogs.toSorted(
        blogSorter
      ).map(blog => {
        return (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>
        )
      })}
    </div>
  )
}

export default UserPage