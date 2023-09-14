import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // Separate the inputs from the reset function so the reset function won't be used in the input fields
  const inputs = {
    type,
    value,
    onChange,
  }

  return {
    inputs,
    reset
  }
}
