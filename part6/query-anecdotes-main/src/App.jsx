import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, updateAnecdote } from './services'

import NotificationContext from './NotificationContext'
import { useContext } from 'react'



const App = () => {
  const [notificaion, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.isLoading) {
    return <div>Loading Anecdotes...</div>
  } else if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateNoteMutation.mutate(votedAnecdote)
    dispatch({
      type: "NOTIFICATION",
      payload: votedAnecdote.content
    })
    setTimeout(() => {
      dispatch({type: "CLEAR"})
    },5000)
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
