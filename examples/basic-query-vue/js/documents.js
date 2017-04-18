var queryDoc = `query {
  getProducts {
    _id
    name
    price
    category
  }
}`

var queryPreprox = `query {
  products {
    _id
    name
    price
  }
  product(product_id: $product_id) {
    _id
    name
    price
  }
  order(order_name: $order_name) {
    _id
    name
    price
    amount
    category
    status
  }
}`

var queryPrice = `query {
  getProductByPrice(price: $price) {
    _id
    name
    price
    category
  }
}`

var addProductDoc = `mutation {
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

var deleteProductDoc = `mutation {
  deleteProduct(id: $product_id) {
    _id
    name
    price
    category
  }
}`
