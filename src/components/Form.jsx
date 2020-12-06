import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Form({ handleSubmit, handleChange, values, errors }) {
  const location = useLocation()

  const buttonText = location.pathname.startsWith('/edit') ? 'Save' : 'Create'

  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className='col s12' id='create-product'>
        <div className='row'>
          <div className='form__input input-field col s12'>
            <input
              onChange={handleChange}
              value={values.title}
              id='title'
              name='title'
              type='text'
              className=' validate'
              placeholder='Title'
            />
          </div>
        </div>
        <div className='row'>
          <div className='form__input input-field col s12'>
            <input
              onChange={handleChange}
              value={values.price}
              id='price'
              name='price'
              type='number'
              className='form__input validate'
              placeholder='Price'
            />
          </div>
        </div>
        <div className='row'>
          <div className='form__input input-field col s12'>
            <textarea
              onChange={handleChange}
              value={values.description}
              form='create-product'
              id='description'
              name='description'
              className='form__input form__textarea validate'
              placeholder='Description'
            />
          </div>
        </div>
        <button className='btn' type='submit'>
          {buttonText}
        </button>
        <Link to='/' className='btn' style={{ marginLeft: 15 }}>
          Back to Main
        </Link>
      </form>
      <div className='errors'>
        <ul className='errors__list'>
          {errors &&
            errors.map(errText => (
              <li key={errText} className='errors__item'>
                {errText}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Form
