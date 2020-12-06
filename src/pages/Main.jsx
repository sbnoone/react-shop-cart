import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, deleteProduct, fetchProducts } from '../redux/modules/products'
import Pagination from '../components/Pagination'
import Sort from '../components/Sort'
import ProductList from '../components/ProductList'
import { ADD_TO_CART, DELETE_PRODUCT, PRODUCTS_PER_PAGE } from '../constants'
import { setSortBy } from '../redux/modules/filter'
import { getProducts } from '../redux/selectors'

const sortTypes = [
  { name: 'алфавиту', type: 'title', order: 'asc' },
  { name: 'цене, дорогие', type: 'price', order: 'desc' },
  { name: 'цене, дешевые', type: 'price', order: 'asc' },
]

export default function Main() {
  const params = useParams()
  const dispatch = useDispatch()

  const products = useSelector(getProducts)
  const sortBy = useSelector(state => state.filters.sortBy)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)

  const [searchText, setSearchText] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)

  const onChange = e => {
    setSearchText(e.target.value)
  }

  const selectSortType = React.useCallback(type => {
    dispatch(setSortBy(type))
  }, [])

  const handleProductsClick = async e => {
    const id = e.target.dataset.id
    if (id) {
      const [type, itemId] = id.split('-')

      switch (type) {
        case ADD_TO_CART: {
          try {
            const { inCart, ...product } = products.find(p => p.id === itemId)
            const itemToAdd = Object.assign({}, product, { quantity: 1 })

            dispatch(addToCart(itemToAdd, itemId))
            return
          } catch (error) {
            console.log('product click error', error)
          }
          break
        }
        case DELETE_PRODUCT: {
          try {
            if (window.confirm('You definitely want to delete?')) {
              dispatch(deleteProduct(itemId))
              return
            }
          } catch (error) {
            console.log('product click error', error)
          }
          break
        }
        default:
          return console.log('Unknown Type')
      }
    }
  }

  const paginate = pageNum => setCurrentPage(pageNum)

  React.useEffect(() => {
    dispatch(fetchProducts(sortBy))
  }, [sortBy])

  React.useEffect(() => {
    if (params.pageNumber && !isNaN(params.pageNumber)) {
      setCurrentPage(Number(params.pageNumber))
    }
  }, [params])

  const indexOfLastPost = currentPage * PRODUCTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - PRODUCTS_PER_PAGE

  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost)
  const filteredProducts = currentProducts.filter(p =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  )
  const productsToRender = searchText ? filteredProducts : currentProducts
  // const isPaginationVisble = productsToRender.length >= PRODUCTS_PER_PAGE || !searchText

  return (
    <div className='main-page'>
      <div className='main-page__controls'>
        <div className='main-page__control'>
          <Link to='/create' className='btn btn-primary' title='Create new product'>
            Create
          </Link>
        </div>
        <div className='main-page__control main-page__control--right'>
          <Link to='/cart' className='btn btn-primary' title='Link to cart'>
            Cart
          </Link>
        </div>
        <div className='main-page__control'>
          <div className='input-field'>
            <input
              value={searchText}
              onChange={onChange}
              id='filterByTitle'
              type='email'
              className='validate'
              placeholder='Filter by title'
              title='Filter products by its title'
            />
          </div>
        </div>
        <Sort sortTypes={sortTypes} activeSortLabel={sortBy.name} selectSortType={selectSortType} />
      </div>
      {error ? (
        <p>Error! Try again</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : products && products.length ? (
        <>
          <ProductList products={productsToRender} handleProductsClick={handleProductsClick} />
          <Pagination
            prodPerPage={PRODUCTS_PER_PAGE}
            totalProducts={products.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      ) : (
        <p>No products</p>
      )}
    </div>
  )
}
