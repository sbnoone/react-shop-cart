import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Products } from '../api/products'
import { useForm } from '../hooks/useForm'
import Form from '../components/Form'
import { isEmptyObj } from '../utils'

export default function CreateOrEdit() {
  const history = useHistory()
  const { pathname } = history.location

  const [currentValues, setCurrentValues] = React.useState()
  const form = useForm({ title: '', description: '', price: '' }, createOrUpdateProduct)
  const { id } = useParams()

  async function createOrUpdateProduct() {
    if (pathname === '/create') {
      try {
        await Products.create(form.values)

        history.push('/')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const isChanged = Object.keys(form.values).some(
          key => form.values[key] !== currentValues[key]
        )

        if (isChanged) {
          await Products.update(id, form.values)
        }

        history.push('/')
      } catch (error) {
        console.log('Values to update', form.values)
        console.log('error', error)
      }
    }
  }

  async function fetchProduct() {
    try {
      const product = await Products.findById(id)

      if (isEmptyObj(product)) {
        history.replace('/404')
      } else {
        form.setValues(product)
        setCurrentValues(product)
      }
    } catch (error) {
      console.log('fetchProduct error', error)
    }
  }

  React.useEffect(() => {
    if (pathname !== '/create') fetchProduct()
  }, [id])

  return (
    <div>
      <h4 style={{ textAlign: 'center' }}>{pathname === '/create' ? 'Create' : 'Edit'} Product</h4>
      <Form {...form} />
    </div>
  )
}
