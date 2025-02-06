import { useState } from "react"
import blogService from '../services/blogs'

const NewBlog = ({ user, setBlogs, blogs, setErrorMessage, setSuccessMessage }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleNewNote = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      url,
      author: user.id
    }
    try {
      const response = await blogService.createBlog(newBlog)
      
      const updatedBlogs = blogs.concat(response)
      console.log(updatedBlogs)
      setBlogs(updatedBlogs)
      setSuccessMessage(`A new blog ${response.title} by ${response.author.name} has been added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error Adding blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  return (
    <form onSubmit={handleNewNote}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlog