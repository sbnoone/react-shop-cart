import { Products } from '../../api/products'
import { Cart } from '../../api/cart'

const FETCH_PRODUCTS_START = 'cart/FETCH_PRODUCTS_START'
const FETCH_PRODUCTS_OK = 'cart/FETCH_PRODUCTS_OK'
const FETCH_PRODUCTS_ERROR = 'cart/FETCH_PRODUCTS_ERROR'
const CHANGE_ITEM_QUANTITY = 'cart/CHANGE_ITEM_QUANTITY'
const REMOVE_FROM_CART = 'cart/REMOVE_PRODUCT'

const initialState = {
  products: [],
  loading: false,
  error: false,
}

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      }

    case FETCH_PRODUCTS_OK: {
      return {
        products: payload,
        loading: false,
        error: false,
      }
    }

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case CHANGE_ITEM_QUANTITY: {
      let newTotalPrice = state.totalPrice
      let newTotalCount = state.totalCount
      const newProducts = state.products.map(p => {
        if (p.id === payload.id) {
          if (payload.quantity < 0 && p.quantity === 1) {
            return p
          }
          newTotalPrice += p.price * payload.quantity
          newTotalCount += payload.quantity
          return {
            ...p,
            quantity: p.quantity + payload.quantity,
          }
        }
        return p
      })
      return {
        products: newProducts,
        totalCount: newTotalCount,
        totalPrice: newTotalPrice,
      }
    }

    case REMOVE_FROM_CART:
      const itemToDelete = state.products.find(item => item.id === payload)

      return {
        ...state,
        products: state.products.filter(item => item.id !== payload),
        totalPrice: state.totalPrice - itemToDelete.price * itemToDelete.quantity,
        totalCount: state.totalCount - itemToDelete.quantity,
      }

    default:
      return state
  }
}

export const fetchStart = () => ({
  type: FETCH_PRODUCTS_START,
})
export const fetchOk = products => ({
  type: FETCH_PRODUCTS_OK,
  payload: products,
})
export const fetchError = () => ({
  type: FETCH_PRODUCTS_ERROR,
})

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  payload: id,
})

export const changeItemCountBy = (id, changeBy) => ({
  type: CHANGE_ITEM_QUANTITY,
  payload: { id, quantity: changeBy },
})

// Async actions
export const fetchProductsFromCart = () => async dispatch => {
  dispatch(fetchStart())
  try {
    const products = await Cart.getAll()
    dispatch(fetchOk(products))
  } catch (error) {
    dispatch(fetchError())
    console.log('Fetch from cart error', error)
  }
}

export const removeProductsFromCart = id => async dispatch => {
  try {
    await Promise.all([Products.update(id, { inCart: false }), Cart.remove(id)])
    dispatch(removeFromCart(id))
  } catch (error) {
    console.log('Remove from cart error', error)
  }
}
