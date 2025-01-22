import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNameChange = (event) => {
    const newText = event.target.value
    console.log(newText)
    setNewName(newText)
  }
  const isNameInContact = (person) => person.name === newName

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(isNameInContact) === undefined) {
      console.log("Adding", newName, "to contacts with phone number", newNumber)
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      const errorMessage = `${newName} is already added to phonebook`
      alert(errorMessage)
    }
  }

  const filteredPersons = persons.filter(person => {
    console.log(person.name.toLowerCase())
    console.log(newSearch)
    return (
      person.name.toLowerCase().includes(newSearch)
    )
  })


  const handleNumberChange = (event) => {
    const newText = event.target.value
    console.log(newText)
    setNewNumber(newText)
  }

  const handleSearchChange = (event) => {
    const newText = event.target.value
    console.log(newText)
    const newTextLowerCase = newText.toLowerCase()
    setNewSearch(newTextLowerCase)
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
      </div>
    </div>
  )
}

const Filter = ({newSearch,handleSearchChange}) => {
  return (
    <div>
      Filter shown with <input value={newSearch} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({addContact,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} type="tel" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({ name, number }) => <p>{name} {number}</p>

export default App