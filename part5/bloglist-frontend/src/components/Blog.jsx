import Togglable from './Togglable'
import { useRef, useState } from 'react'
import BlogDetails from './BlogDetails'


const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 10
  }

  const blogCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
    transition: 'transform 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  }


  const showBlogDetails = () => {
    if (showDetails) {
      return (
        <BlogDetails blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} />
      )
    }

  }

  return (
    <div style={blogCardStyle}>
      <div style={headerStyle}>
        <strong>{blog.title}</strong>
        <Togglable showButtonLabel='view details' hideButtonLabel='hide detail' needsToggler={true} setToggler={setShowDetails}>
        </Togglable>
      </div>
      <div>
        {showBlogDetails()}
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'

export default Blog