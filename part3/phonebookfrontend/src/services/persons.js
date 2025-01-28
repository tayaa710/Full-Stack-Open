import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (person) => {
  if (window.confirm(`Do you really want to delete '${person.name}' `)) {
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(() => console.log(`deleted '${person.name}'`))
  }else{
    return Promise.reject("User Cancelled")
  }
}

export default {
  getAll,
  create,
  update,
  remove
}