import React from 'react'

function InputField({ onChange, type = 'text', name = '', placeholder = '', className = '' }) {
  return (
    <div className='input-field'>
      <input id='email' type='email' className=' validate' placeholder='Title' />
      {/* <label htmlfor='email'>Email</label> */}
    </div>
  )
}

export default InputField
