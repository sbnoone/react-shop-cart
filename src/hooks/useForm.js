import { useState } from 'react'
import { validate } from '../utils/validators'

export function useForm(initialValues = {}, onSubmit = () => {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState([])

  const handleChange = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { errors, isValid } = validate(values)

    if (!isValid) {
      setErrors(Object.values(errors))
    } else {
      onSubmit()
    }
  }

  return { values, errors, handleChange, handleSubmit, setValues }
}
