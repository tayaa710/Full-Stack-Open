import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl,anecdote)
  return response.data
}

const updateId = async (anecdote) => {
  console.log(anecdote)
  const response = await axios.put(`${baseUrl}/${anecdote.id}`,{...anecdote,votes: anecdote.votes + 1})
  console.log(response.data)
  return response.data
}

export default { getAll, createNew, updateId }