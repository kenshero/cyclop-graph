export const queryDoc = `query {
  getProducts {
    _id
    name
    price
    category
  }
}`

export const addProductDoc = `mutation {
  addProduct(
    name: $name,
    price: $price,
    category: $category
  ) {
    _id
    name
    price
    category
  }
}`

export const deleteProductDoc = `mutation {
  deleteProduct(id: $product_id) {
    _id
    name
    price
    category
  }
}`
