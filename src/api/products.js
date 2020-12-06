import { PRODUCTS_URL, PRODUCTS_PER_PAGE } from '../constants'

export class Products {
  static async getAll(sortBy) {
    const url = `${PRODUCTS_URL}?_sort=${sortBy.type}&_order=${sortBy.order}`
    const products = await (await fetch(url)).json()
    return products
  }

  static async findById(id) {
    const product = await (await fetch(`${PRODUCTS_URL}/${id}`)).json()
    return product
  }

  static async create(productData) {
    const body = JSON.stringify({
      ...productData,
      inCart: false,
    })

    const product = await (
      await fetch(PRODUCTS_URL, {
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json',
        },
      })
    ).json()
    return product
  }

  static async update(id, productData) {
    const body = JSON.stringify({
      ...productData,
    })

    const product = await (
      await fetch(`${PRODUCTS_URL}/${id}`, {
        method: 'PATCH',
        body,
        headers: {
          'Content-type': 'application/json',
        },
      })
    ).json()
    return product
  }

  static async delete(id) {
    await (await fetch(`${PRODUCTS_URL}/${id}`, { method: 'DELETE' })).json()
  }
  // static async get(pageNum) {
  //   try {
  //     const products = await (
  //       await fetch(`${GET_PRODUCTS_URL}?_page=${pageNum}&_limit=${PRODUCTS_PER_PAGE}`)
  //     ).json()

  //     return products
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
