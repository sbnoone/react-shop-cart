import React from 'react'
import { Link } from 'react-router-dom'
import { ADD_TO_CART, DELETE_PRODUCT } from '../constants'

function ProductItem({ id, title, price, description, inCart, removeItem, addItemToCart }) {
  return (
    <div className='product__item col s12 m6'>
      <div className='product__card card'>
        <div className='product__content card-content'>
          <div className='card-content-item'>
            <h5 className='card-title'>
              <strong>{title}</strong>
            </h5>
            <span className='card-title grey-text text-darken-4'>
              <strong>{price}</strong>
            </span>
          </div>
          <div className='test'>
            <p className='product__description'>{description}</p>
          </div>
        </div>
        <div className='card-action'>
          <button
            disabled={inCart}
            title='Add product to cart'
            className='btn card-btn'
            data-id={`${ADD_TO_CART}-${id}`}
          >
            Add to cart
          </button>
          <Link className='btn card-btn' to={`/edit/${id}`} title='Edit current product'>
            Edit
          </Link>
          <button
            title='Delete current product'
            className='btn red card-btn'
            data-id={`${DELETE_PRODUCT}-${id}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
