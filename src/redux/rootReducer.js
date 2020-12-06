import { combineReducers } from 'redux'
import cartReducer from './modules/cart'
import filtersReducer from './modules/filter'
import productsReducer from './modules/products'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filters: filtersReducer,
})

export default rootReducer
