import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import UserPage from './components/UserPage'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null){
    return(
      <div>
        <Notification message={errorMessage} />
        
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </div>
    )
  }

  return(
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <UserPage setUser={setUser} user={user} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
    </div>
  )
}

export default App

/* useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const [blogs, setBlogs] = useState([]) 
  
  <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  */