import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setBlogs, blogs, setErrorMessage, setSuccessMessage, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleNewNote = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      url,

    }
    try {
      const response = await blogService.createBlog(newBlog)

      const updatedBlogs = blogs.concat(response)
      console.log(updatedBlogs)
      setBlogs(updatedBlogs)
      setSuccessMessage(`A new blog ${response.title} by ${response.author} has been added`)
      toggleVisibility()
      setTitle('')
      setUrl('')
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

  const formStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }
  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
    width: '100%'
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: '0.2s'
  }

  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  }

  return (
    <form onSubmit={handleNewNote} style={formStyle}>
      <div>
        title:
        <input
          data-testid="title"
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          style={inputStyle}
          placeholder='Blog Name'
        />
      </div>
      <div>
        url:
        <input
        data-testid="url"
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
          style={inputStyle}
          placeholder='Blog Url'
        />
      </div>
      <button type='submit' style={buttonStyle}>
        ➕ Create
      </button>
    </form>
  )
}

NewBlog.displayName = 'NewBlog'

export default NewBlog