/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const sortedState = [...state].sort((a, b) => {
      return b.votes - a.votes
    })
    return sortedState
  })
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote}/>
      )}
      <h2>Anecdotes</h2>
    </div>
  )


}

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(updateVote(id))
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList