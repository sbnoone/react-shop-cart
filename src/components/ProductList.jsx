import React from 'react'
import { Cart } from '../api/cart'
import { Products } from '../api/products'
import ProductItem from './ProductItem'

export default function ProductList({ products, handleProductsClick }) {
  return (
    <div className='row products' onClick={handleProductsClick}>
      {products && products.map(p => <ProductItem key={p.id} {...p} />)}
    </div>
  )
}
