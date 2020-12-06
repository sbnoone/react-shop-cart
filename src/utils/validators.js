export function validate({ title, price, description }) {
  const errors = {}

  if (title.trim() === '') {
    errors.title = 'Введите название товара'
  }

  if (String(price).trim() === '') {
    errors.price = 'Введите цену'
  } else if (isNaN(price)) {
    errors.price = 'Цена должна быть числом'
  }

  if (description.trim() === '') {
    errors.description = 'Введите описание товара'
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  }
}
