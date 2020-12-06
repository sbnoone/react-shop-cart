import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CartList from '../components/CartList'
import { changeItemCountBy, fetchProductsFromCart } from '../redux/modules/cart'
import { removeProductsFromCart } from '../redux/modules/cart'
import { DECREMENT_CART_ITEM, DELETE_FROM_CART, INCREMENT_CART_ITEM } from '../constants'
import { getCartProducts, getTotalPriceAndCount } from '../redux/selectors'

export default function Cart() {
  const dispatch = useDispatch()
  const products = useSelector(getCartProducts)
  const { totalPrice, totalCount } = useSelector(getTotalPriceAndCount)
  const loading = useSelector(state => state.cart.loading)
  const error = useSelector(state => state.cart.error)

  const handleCartItemClick = async e => {
    const id = e.target.dataset.id

    if (id) {
      const [type, itemId] = id.split('-')

      switch (type) {
        case INCREMENT_CART_ITEM: {
          try {
            dispatch(changeItemCountBy(itemId, 1))
            return
          } catch (error) {
            console.log('increment quantity error', error)
          }
          break
        }
        case DECREMENT_CART_ITEM: {
          try {
            dispatch(changeItemCountBy(itemId, -1))
            return
          } catch (error) {
            console.log('decrement quantity error', error)
          }
          break
        }
        case DELETE_FROM_CART: {
          try {
            dispatch(removeProductsFromCart(itemId))
            return
          } catch (error) {
            console.log('Remove from cart error', error)
          }
          break
        }
        default:
          return console.log('Unknown Type')
      }
    }
  }

  React.useEffect(() => {
    dispatch(fetchProductsFromCart())
  }, [dispatch])

  if (error) return <p>Ошибка! Повторите попытку</p>

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>CART</h1>

      <CartList products={products} handleCartItemClick={handleCartItemClick} />
      <div>Total price: {totalPrice}</div>
      <div>Total count: {totalCount}</div>

      <Link to='/' className='btn'>
        Back to main
      </Link>
    </div>
  )
}
