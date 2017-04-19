import { client } from './cyclopconf'
import { queryDoc, addProductDoc, deleteProductDoc} from './documents'

const app = new Vue({
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