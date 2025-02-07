import blogService from '../services/blogs'
import { useEffect } from 'react'


const BlogDetails = ({ blog, blogs, setBlogs, user }) => {
  const blogDetailStyle = {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginTop: '10px'
  }

  const detailRowStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    padding: '5px 0'
  }

  const likeButtonStyle = {
    backgroundColor: '#e91e63',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.2s',
    fontWeight: 'bold'
  }

  useEffect(() => {
    console.log('Updated blogs state:', blogs)
  }, [blogs])

  const likeBlog = async () => {
    const userId = blog.user.id
    const author = blog.author

    const likedBlog = { ...blog, likes: blog.likes + 1, user: userId, author, id: blog.id }
    try {
      const result = await blogService.updateBlog(likedBlog)
      console.log(user)
      const updatedBlogs = blogs.map(blogIn => {
        if (blogIn.id === result.id) {
          return result
        } else {
          return blogIn
        }

      })
      setBlogs(updatedBlogs)

    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async () => {
    const confirm = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)
    if (confirm) {
      if (user.id === blog.user.id) {
        try {
          await blogService.deleteBlog(blog)
          console.log(blog.id)
          const updatedBlogs = blogs.filter(blogToDelete => {
            return (
              blogToDelete.id !== blog.id
            )
          })
          console.log(updatedBlogs)
          setBlogs(updatedBlogs)
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('You do not have permission')
      }
    } else {
      return

    }
  }

  if (user.id === blog.user.id) {
    return (
      <div style={blogDetailStyle}>
        <div style={detailRowStyle}>
          <strong>URL:</strong> {blog.url}
        </div>
        <div style={detailRowStyle}>
          <strong>Likes:</strong> {blog.likes}
          <button style={likeButtonStyle} onClick={likeBlog}>❤️</button>
        </div>
        <div style={detailRowStyle}>
          <strong>Author:</strong> {blog.author}
        </div>
        <button onClick={deleteBlog}>Delete</button>
      </div>
    )
  }

  return (
    <div style={blogDetailStyle}>
      <div style={detailRowStyle}>
        <strong>URL:</strong> {blog.url}
      </div>
      <div style={detailRowStyle}>
        <strong>Likes:</strong> {blog.likes}
        <button style={likeButtonStyle} onClick={likeBlog}>❤️</button>
      </div>
      <div style={detailRowStyle}>
        <strong>Author:</strong> {blog.author}
      </div>
    </div>
  )
}

BlogDetails.displayName = 'BlogDetails'

export default BlogDetails