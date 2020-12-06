import React from 'react'
import CartItem from './CartItem'

function CartList({ products, handleCartItemClick }) {
  return (
    <div className='row' onClick={handleCartItemClick}>
      {products.length ? products.map(p => <CartItem key={p.id} {...p} />) : <p>Корзина пуста</p>}
    </div>
  )
}

export default CartList
