/* eslint-disable react/prop-types */

import { useState } from 'react'

import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'

import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'
import { Anecdote } from './AnecdoteList'







const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 1,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const style = {
    padding: 5
  }

  const match = useMatch('/:id')
  const anecdote = match ?
    anecdotes.find(a => a.id === Number(match.params.id)) 
    : null
  

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Link style={style} to={'/'}>Anecdote</Link>
      <Link style={style} to={'/create'}>Create New</Link>
      <Link style={style} to={'/about'}>About</Link>

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      
      
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

export default App
