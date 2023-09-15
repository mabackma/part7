import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

// Custom hook for country's state
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const apiUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  useEffect(() => {
    if (!name) {
      setCountry({found: false, data: null})
      return
    }

    axios
    .get(apiUrl)
    .then(response => {
      const fetchedCountry = {
        found: true,
        data: {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          capital: response.data.capital[0],
          population: response.data.population,
          flag: `https://flagcdn.com/w320/${response.data.tld[0].substring(1)}.png`
        }
      }
      setCountry(fetchedCountry) 
    })
    .catch(error => {
      console.error('Error fetching data:', error)
      setCountry({found: false, data: null})
    })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button onClick={fetch}>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App