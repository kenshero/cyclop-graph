import { client } from './cyclopconf'
import { queryDoc, queryPreprox, queryPrice, addProductDoc, deleteProductDoc} from './documents'

console.log(client)

const app = new Vue({
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