# Cyclop ! (In Progress. It still not working)

[![Build Status](https://travis-ci.org/kenshero/cyclop-graph.svg?branch=master)](https://travis-ci.org/kenshero/cyclop-graph)

### Document Design


That's it!

```js

var client = new Cyclop.ConnectionGraphql({
  url: "http://localhost:3000/graphql",
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

var app = new Vue({
  el: '#app',
  data: {
    prouductName: "",
    prouductPrice: "",
    prouductCategory: "",
    products: [],
    isError: false,
    errorMsg: ""
  },
  methods: {
    getProducts: function() {
      client.query(queryDoc).then( response => {
        const {errors, data} = response
        if (errors) {
          this.isError = true
          this.errorMsg = errors[0].message
          throw "Error : " + errors[0].message
        }
        this.isError = false
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
      client.mutate(addProductDoc, variables).then( response => {
        const {errors, data} = response
        if (errors) {
          this.isError = true
          this.errorMsg = errors[0].message
          throw "Error : " + errors[0].message
        }
        this.isError = false
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
      client.mutate(deleteProductDoc, variables).then( response => {
        const {errors, data} = response
        if (errors) {
          this.isError = true
          this.errorMsg = errors[0].message
          throw "Error : " + errors[0].message
        }
        this.isError = false
        this.getProducts()
      }).catch( (error) => {
        console.error(error)
      });
    }
  }
})

app.getProducts()

```


### License

MIT