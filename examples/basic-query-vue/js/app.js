var client = new Cyclop.ConnectionGraphql({
  url: "http://localhost:3000/graphql",
  headers: ""
});

var client2 = new Cyclop.ConnectionGraphql({
  url: "http://localhost:3005/graphqlUser",
  headers: ""
});

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

var variables1 = [{
  price: 2000
}]

var variables2 = [{
  product_id: "586a518097934b3a9e4aeaae"
},
{
  order_name: "test woy"
}]

var app = new Vue({
  el: '#app',
  data: {
    prouductName: "",
    prouductPrice: "",
    prouductCategory: "",
    products: []
  },
  methods: {
    getProducts: function() {
        client.query(queryDoc).then( gqlResult => {
            const {errors, data} = gqlResult
            this.products = data.getProducts
        }).catch( (error) => {
            console.error(error)
        });
    },
    addProduct: function() {
        const variables = [{
            name: this.prouductName,
            price: parseInt(this.prouductPrice),
            category: this.prouductCategory.split(",")
        }]
        client.mutate(addProductDoc, variables).then( gqlResult => {
            const {errors, data} = gqlResult
            if (errors) {
              throw "Error : " + errors[0].message
            }
            this.getProducts()
        }).catch( (error) => {
            console.error(error)
        });
    },
    deleteProduct: function(productID) {
        const variables = [{
          product_id: productID
        }]
        console.log(productID)
        client.mutate(deleteProductDoc, variables).then( gqlResult => {
          const {errors, data} = gqlResult
          if (errors) {
            throw "Error : " + errors[0].message
          }
          this.getProducts()
        }).catch( (error) => {
          console.error(error)
        });
    }
  }
})

app.getProducts()