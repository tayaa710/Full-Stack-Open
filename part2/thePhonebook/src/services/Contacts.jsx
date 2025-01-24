
  
  const Contacts = ({ filteredPersons, deleteContact }) => {
    return (
      <div>
        {filteredPersons.map(person => <Person key={person.id} person={person} deleteContact={deleteContact}/>)}
      </div>
    )
  }

  const Person = ({ person,deleteContact}) => {
    return(
    <p>{person.name} {person.number}<button onClick={() => deleteContact(person)}>delete</button></p> 
    )
  }

  export default Contacts