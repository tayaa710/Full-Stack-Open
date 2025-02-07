import Togglable from "./Togglable"
import { useRef, useState } from "react"
import BlogDetails from "./BlogDetails"


const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft:10
    
  }

  const showBlogDetails = () => {
    if (showDetails) {
      return (
        <BlogDetails blog={blog} />
      )
    }

  }

  return (


    <div style={blogStyle}>
      <div style={{display: 'flex', gap: '10px'}}>
        <strong>{blog.title}</strong>
        <Togglable showButtonLabel="view details" hideButtonLabel="hide detail" needsToggler={true} setToggler={setShowDetails}>
        </Togglable>
      </div>
      <div>
        {showBlogDetails()}
      </div>
    </div>
  )
}

export default Blog