import { createSelector } from 'reselect'

export const getProducts = state => state.products.items
export const getCartProducts = state => state.cart.products

export const getTotalPriceAndCount = createSelector(getCartProducts, products =>
  products.reduce(
    (res, prod) => {
      res.totalCount += prod.quantity
      res.totalPrice += prod.price * prod.quantity
      return res
    },
    {
      totalCount: 0,
      totalPrice: 0,
    }
  )
)
