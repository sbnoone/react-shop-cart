import { CART_PRODUCTS_URL } from '../constants'

export class Cart {
  static async getAll() {
    const products = await (await fetch(`${CART_PRODUCTS_URL}`)).json()
    return products
  }

  static async add(productData = []) {
    const body = JSON.stringify({
      ...productData,
    })

    const product = await (
      await fetch(`${CART_PRODUCTS_URL}`, {
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json',
        },
      })
    ).json()
    return product
  }

  static async remove(id) {
    const product = await (await fetch(`${CART_PRODUCTS_URL}/${id}`, { method: 'DELETE' })).json()
    return product
  }
}
