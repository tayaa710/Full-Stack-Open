/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux"
import {  initializeAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"
import { voteForAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = filter !== ""
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes
    return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList