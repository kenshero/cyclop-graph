# Cyclop
Cyclop is a GraphQL client. ** Cyclop use Content-Type : application/graphql only **

[![Build Status](https://travis-ci.org/kenshero/cyclop-graph.svg?branch=master)](https://travis-ci.org/kenshero/cyclop-graph)


### Installation

install with npm or yarn
```
npm install --save cyclop-graph
// or
yarn add cyclop-graph
```

install in a browser.

```
<script type="text/javascript" src="https://unpkg.com/cyclop-graph@0.1.8/dist/cyclop.js"></script>
```

# Basic Usage

### Query
module bundler style
```
import { CyclopConnection } from 'cyclop-graph'

const client = new CyclopConnection({
  url: "http://localhost:3000/graphql",
  headers: {
    Authorization: 'Bearer ' + token
  }
})

const documentExam = `query {
  getProducts {
    _id
    name
    price
    category
  }
}`

client.query(documentExam).then( response => {
  const {errors, data} = response
}).catch( (error) => {

});

```

Vanilla Style
```html
<script type="text/javascript">

var client = new Cyclop.CyclopConnection({
  url: "http://localhost:3000/graphql",
  headers: {
    Authorization: 'Bearer ' + token
  }
});

var documentExam = `query {
  getProducts {
    _id
    name
    price
    category
  }
}`

client.query(documentExam).then( response => {
  console.log(response);
}).catch( (error) => {

});

</script>
```

### Query With Variables
```
import { CyclopConnection } from 'cyclop-graph'

const client = new CyclopConnection({
  url: "http://localhost:3000/graphql",
  headers: {
    Authorization: 'Bearer ' + token
  }
})

const documentExam = `query {
  getProductByPrice(price : $price) {
    _id
    name
    price
    category
  }
}`

const variables = [{
  price: 2000,
}]

client.query(documentExam, variables).then( response => {
  const {errors, data} = response
}).catch( (error) => {

});
```

### Mutation
```
import { CyclopConnection } from 'cyclop-graph'

const client = new CyclopConnection({
  url: "http://localhost:3000/graphql",
  headers: {
    Authorization: 'Bearer ' + token
  }
})

const addProductDoc = `mutation {
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

const variables = [{
  name: "Ninetendo Switch",
  price: $299.99,
  category: ["game", "handheld"]
}]

client.mutate(addProductDoc, variables).then( response => {
  console.log(response)
}).catch( (error) => {

});

```
### License

MIT