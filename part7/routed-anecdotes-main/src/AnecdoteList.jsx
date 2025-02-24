import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <p>{notification}</p>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >{<Link to={`/${anecdote.id}`}>{anecdote.content}</Link>}</li>
      )}
    </ul>
  </div>
)

export const Anecdote = ({anecdote}) => {
  return(
    <>
    <h2>{anecdote.content}</h2>
    <p>Has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}</p>
    </>
  )
}

export default AnecdoteList