export const queryPriceVars = [{
  price: 2000
}]

export const queryImagesVars = [{
  images: [{
    name: "test_name",
    url: "www.xxxx.yyy",
  }]
}]

export const queryProductAndOrderVars = [{
  product_id: '1'
},
{
  id: '2',
  order_name: 'test mock'
}]

export const queryPrice = `query {
  getProductByPrice(price: $price) {
    _id
    name
    price
    category
  }
}`

export const queryImages = `query {
  getImages(images: $images) {
    _id
    images
  }
}`

export const queryProducts = `query {
  getProducts {
    _id
    name
    price
    category
  }
}`

export const queryProductAndOrder = `query {
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
  order(id: $id, order_name: $order_name) {
    _id
    name
    price
    amount
    category
    status
  }
}`
