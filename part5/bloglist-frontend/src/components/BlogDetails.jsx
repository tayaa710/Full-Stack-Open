const BlogDetails = ({blog}) => {
  const blogDetailStyle = {
    paddingTop: 1,
    paddingLeft: 2,
  }
  return (
    <div style={blogDetailStyle}>
      <p>Url: {blog.url}</p>
      <p style={{display: 'flex', gap: '10px'}}>Likes: {blog.likes}<button>like</button></p>
      <p>Author: {blog.author.name}</p>
    </div>
  )
}

export default BlogDetails