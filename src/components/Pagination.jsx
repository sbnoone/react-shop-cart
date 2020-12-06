import React from 'react'
import { Link } from 'react-router-dom'

function Pagination({ prodPerPage, totalProducts, currentPage, paginate }) {
  const pageNumbers = createPageNumbers(totalProducts, prodPerPage)

  return (
    <div className='pagination-wrapper'>
      <ul className='pagination'>
        {pageNumbers.map(num => (
          <li key={num} className={num === currentPage ? 'active' : 'waves-effect'}>
            <Link onClick={() => paginate(num)} to={`/page=${num}`}>
              {num}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination

function createPageNumbers(total, limit) {
  const pageCount = Math.ceil(total / limit)

  const pageNumbers = new Array(pageCount).fill().map((_, index) => index + 1)

  return pageNumbers
}
