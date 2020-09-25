import React, { useState, useEffect } from 'react'

import nodeServices from './services/phones'

// Notification
const Notification = ({ notification }) => {

  const style = {
    border: '3px solid green',
    borderRadius: 5,
    fontSize: 24,
    color: 'green',
    padding: 10,
    margin: 10,

  }

  if (notification === null) {
    return null
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

//Error Notification
const ErrorNotification = ({ notification }) => {

  const style = {
    border: '3px solid red',
    borderRadius: 5,
    fontSize: 24,
    color: 'green',
    padding: 10,
    margin: 10,

  }

  if (notification === null) {
    return null
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}


// Deleting contact
const deleteItem = (id, array, setPersons) => {

  let check = window.confirm('Are you sure that you want to delete this contact?')

  if (check) {
    setPersons(array.filter(obj => obj.id !== id))


    nodeServices
      .deletePhone(id)
      .then(response => {
        console.log(response)
      }).catch(e => console.log(e))
  }


}

const DisplayList = ({ array, filter, setPersons }) => {



  if (filter === '') {
    return array.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => deleteItem(person.id, array, setPersons)}>delete</button></li>)
  } else {
    const filtered = array.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return filtered.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => deleteItem(person.id)}>delete</button></li>)
  }
}

const Filter = ({ search, handleSearch }) => {

  return (
    <div>
      filter shown with <input value={search} onChange={handleSearch} />
    </div>
  )
}

const PersonForm = ({ addName, newName, handleInputChange, newNumber, handleNumberChange }) => {

  return (
    <form onSubmit={addName}>
      <SingleInput name={'Name: '} value={newName} handleChange={handleInputChange} />
      <SingleInput name={'Number: '} value={newNumber} handleChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const SingleInput = ({ name, value, handleChange }) => {
  return (
    <div>
      {name}: <input
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)


  //Getting initial data

  useEffect(() => {
    nodeServices
      .getAll()
      .then(contacts => setPersons(contacts))
  }, [])


  const addName = (event) => {
    event.preventDefault()
    let check = false

    persons.forEach(person => {
      if (person.name === newName.trim()) {
        check = true
      }
    })
    if (check === true) {
      let proceed = window.confirm(`${newName.trim()} is already added to phonebook, replace old number with the old one?`)
      if (proceed) {
        const person = persons.find(obj => obj.name === newName.trim())
        const urlId = person.id
        const changedPerson = { ...person, number: newNumber }



        nodeServices.updatePhone(urlId, changedPerson).then(response => {
          setPersons(persons.map(person => person.id !== urlId ? person : response.data))
          setNotification(`Updated ${changedPerson.name} number to ${changedPerson.number}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        }).catch(e => {
          console.log(e)
          setErrorNotification(`${changedPerson.name} was already deleted! Refresh the page, please`)
          setTimeout(() => {
            setErrorNotification(null)
          }, 3000)
        })

        setNewNumber('')
        setNewName('')

      }
    } else {
      const person = {
        name: newName.trim(),
        number: newNumber,

      }

      setNotification(`Added ${person.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      nodeServices
        .addPhone(person)
        .then(contacts => {
          setPersons(persons.concat(contacts))
        }).catch(e => {
          console.log(e)
        })

      setNewNumber('')
      setNewName('')

    }
  }

  // Handling input change

  const handleInputChange = (event) => {

    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <ErrorNotification notification={errorNotification} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleInputChange={handleInputChange} addName={addName} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        <DisplayList array={persons} filter={search} setPersons={setPersons} />
      </ul>
    </div>
  )
}

export default App
