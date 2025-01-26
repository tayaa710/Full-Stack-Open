import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import PersonForm from './services/PersonForm'
import Contacts from './services/Contacts'
import Filter from './services/Filter'


const App = () => {

  /*useEffect to load everything the first time*/
  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  /*Defining State Functions*/

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(null)

  /*Handelers for inputs*/
  const handleNameChange = (event) => {
    const newText = event.target.value
    setNewName(newText)
  }

  const handleNumberChange = (event) => {
    const newText = event.target.value
    setNewNumber(newText)
  }

  const handleSearchChange = (event) => {
    const newText = event.target.value
    const newTextLowerCase = newText.toLowerCase()
    setNewSearch(newTextLowerCase)
  }

  /*AXIOS CALLS*/
  /*Delete from database*/

  const deleteContact = (person) => {
    personsService.remove(person).then(() => setPersons(persons.filter(personToRemove => personToRemove.id !== person.id))).catch(error => console.log(error))
  }

  /*Add to database*/

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personsService.create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added '${newPerson.name}'`)
          setIsError(false)
          setTimeout(() => {
            setNotificationMessage(null)
            setIsError(null)
          }, 5000)
        })

    } else {

      if (persons.find(person => person.name === newName && person.number === newNumber) === undefined) {

        if (window.confirm(`'${newName}' is already added to the phonebook, replace the old number with a new one?`)) {
          console.log("Chose to update the phone number")
          const oldContact = persons.find(person => person.name === newName)
          const newContact = { ...oldContact, number: newNumber }

          personsService.update(oldContact.id, newContact)
            .then(response => {
              const person = response.data
              setPersons(persons.map(person => person.id === oldContact.id ? newContact : person))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              console.log('Error caught')
              setNotificationMessage(`Information of '${newName}' has already been removed from the server`)
              setPersons(persons.filter(person => person.id !== oldContact.id))
              setIsError(true)
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                setNotificationMessage(null)
                setIsError(null)
              }, 5000)
            })
        } else {
          console.log("Chose to not update the phone number")
        }
      } else {
        const errorMessage = `${newName} is already in the phonebook with this number`
        alert(errorMessage)
      }
    }
  }
  /*END OF AXIOS CALLS*/

  /*filter function*/

  const filteredPersons = persons.filter(person => {
    return (
      person.name.toLowerCase().includes(newSearch)
    )
  })

  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError}/>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Contacts filteredPersons={filteredPersons} deleteContact={deleteContact} />
    </div>
  )
}

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: '#017E00',
    backgroundColor: '#D3D3D3',
    padding: 10,
    fontSize: 30,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 20
  }

  const errorStyle = {
    color: '#FF0300',
    backgroundColor: '#D3D3D3',
    padding: 10,
    fontSize: 30,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 20
  }

  if (message === null) {
    return null
  }else {
    return (
      <div style={isError? errorStyle : notificationStyle}>
        {message}
      </div>
    )
  }
}

export default App