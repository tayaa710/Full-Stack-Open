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

  const appContainerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  }

  // ✅ Centering the login screen
  const loginContainerStyle = {
    maxWidth: '400px',
    margin: '100px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  }

  if (user === null){
    return (
      <div style={loginContainerStyle}>
        <h1>Login</h1>
        <Notification message={errorMessage} />
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </div>
    )
  }

  return (
    <div style={appContainerStyle}>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <UserPage
        setUser={setUser}
        user={user}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  )
}

export default App