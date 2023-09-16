import { useState, useEffect } from 'react'
import noteService from "./services/notes";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook that works for both notes and phone numbers.
// Tested with json-server at port 3005
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const authToken = 'user token'

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        noteService.setToken(authToken)
        const response = await noteService.getAll(baseUrl)
        setResources(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    try {
      noteService.setToken()
      const response = await noteService.create(baseUrl, resource)
      setResources((prevResources) => [...prevResources, response])
    } catch (error) {
      console.error('Error creating resource:', error)
    }
  }

  const service = {
    create,
  }

  return [resources, service];
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App