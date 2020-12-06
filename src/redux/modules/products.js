import { Products } from '../../api/products'
import { Cart } from '../../api/cart'

const LOADING_START = 'products/LOADING_START'

const FETCH_PRODUCTS_START = 'products/FETCH_PRODUCTS_START'
const FETCH_PRODUCTS_OK = 'products/FETCH_PRODUCTS_OK'
const FETCH_PRODUCTS_ERROR = 'products/FETCH_PRODUCTS_ERROR'

const ADD_TO_CART = 'products/ADD_TO_CART'
const ADD_TO_CART_ERROR = 'products/ADD_TO_CART_ERROR'

const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const DELETE_PRODUCT_ERROR = 'products/DELETE_PRODUCT_ERROR'

const initialState = {
  items: [],
  loading: false,
  error: false,
}

export default function productsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PRODUCTS_OK:
      return {
        items: payload,
        loading: false,
        error: false,
      }

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case ADD_TO_CART: {
      return {
        items: state.items.map(item => (item.id === payload ? { ...item, inCart: true } : item)),
        loading: false,
        error: false,
      }
    }

    case ADD_TO_CART_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      }
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload),
        loading: false,
      }
    }
    case DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      }
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

// Async actions
export const fetchProducts = sortBy => async dispatch => {
  dispatch(fetchStart())
  try {
    const products = await Products.getAll(sortBy)
    dispatch(fetchOk(products))
  } catch (error) {
    dispatch(fetchError())
    console.log('Fetch products Error', error)
  }
}

export const addToCart = (item, id) => async dispatch => {
  dispatch({ type: LOADING_START })

  try {
    await Promise.all([Cart.add(item), Products.update(id, { inCart: true })])

    dispatch({ type: ADD_TO_CART, payload: id })
  } catch (error) {
    console.log('Add to cart error', error)

    dispatch({ type: ADD_TO_CART_ERROR })
  }
}

export const deleteProduct = id => async dispatch => {
  dispatch({ type: LOADING_START })
  try {
    await Products.delete(id)
    dispatch({ type: DELETE_PRODUCT, payload: id })
  } catch (error) {
    console.log('Delete product error', error)
  }
}
