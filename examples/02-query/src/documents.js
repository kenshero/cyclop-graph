export const queryDoc = `query {
  products {
    _id
    name
    price
  }
}`

export const mutateDoc = `
mutation {
  addProduct(
    name: ${name},
    price: ${price},
    category: ${category}
  ) {
    _id
    name
    price
    category
  }
}`