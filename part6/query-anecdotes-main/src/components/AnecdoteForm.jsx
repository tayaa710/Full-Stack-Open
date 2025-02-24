import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (e => {
      if (e.response.status === 400) {
        dispatch({
          type: "NOTIFICATION",
          payload: "Anecdote must have length 5 or more"
        })
        setTimeout(() => {
          dispatch({type: "CLEAR"})
        },5000)
      }
      
    })
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
