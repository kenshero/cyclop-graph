# Cyclop

### Document Design

That's it!

```js
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
```


### License

MIT