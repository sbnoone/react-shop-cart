import React from 'react'
import { DECREMENT_CART_ITEM, DELETE_FROM_CART, INCREMENT_CART_ITEM } from '../constants'

function makeId(prefix, id) {
  return `${prefix}-${id}`
}

function CartItem({ id, quantity, title, price, description, inCart, removeItem, addItemToCart }) {
  // const removeFromCart = () => {
  //   removeItem(id)
  // }

  return (
    <div className='col s12 m6 l4'>
      <div className='card'>
        <div className='card-content'>
          <div className='card-content-item'>
            <h5 className='card-title'>{title}</h5>
            <span className='card-title activator grey-text text-darken-4'>{price * quantity}</span>
          </div>
          <p>{description}</p>
        </div>
        <div className='cart-action card-action'>
          <div className='card-products-count'>
            <button
              disabled={quantity < 2}
              className='btn-floating waves-effect waves-teal'
              data-id={makeId(DECREMENT_CART_ITEM, id)}
            >
              -
            </button>
            <div className='products-quantity'>{quantity}</div>
            <button
              className='btn-floating waves-effect waves-teal'
              data-id={makeId(INCREMENT_CART_ITEM, id)}
            >
              +
            </button>
          </div>
          <button className='btn red card-btn' data-id={makeId(DELETE_FROM_CART, id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
