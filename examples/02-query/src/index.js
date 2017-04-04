import Cyclop from 'cyclop-graph'

const client = Cyclop.ConnectGraphql({
    url: "",
    headers: ""
})

var queryDoc = `query {
products {
  _id
  name
  price
}
}`

var mutateDoc = `
mutation {
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

client.query( queryDoc ).then()
client.mutate( mutateDoc, variables ).then()


console.log(sum(1, 4))