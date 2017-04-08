import 'whatwg-fetch';


const getVariblesSet = (doc) => {
  const regExp = /\(([^)]+)\)/;
  let matches = regExp.exec(doc);
  return matches;
}

const mapDocWithVariables = (doc, variables) => {
  let variablesSet = getVariblesSet(doc);
  console.log(variablesSet);
// `mutation {
//   createOrder(order:{
//     name: $name,
//     price: $pirce,
//     amount: $amount,
//     category: $category,
//     status: $status
//   }) {
//     _id
//     name
//     price
//     amount
//     category
//     status
//   }
// }`




// `query {
//   getProductByPrice(price: $price) {
//     _id
//     name
//     price
//     category
//   }
// }`


  console.log(doc);
  console.log(variables);

}

const fetchData = async (doc, url) => {
  let queryData;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql'
      },
      body: doc
    });
    queryData = await response.json();
  } catch(errors) {
    console.error(errors);
  }
  console.log(url);
  return queryData;
}

export function ConnectionGraphql(network){
  const {url, headers} = network;
  this.url = url;
  this.headers = headers;
  this.query = async function(doc, variables = null) {
    let queryData;
    if(variables) {
      const newDoc = mapDocWithVariables(doc, variables)
      console.log(newDoc);
    } else {
      queryData = await fetchData(doc, this.url)
    }
    return queryData;
  } // query
}

export const sum = (a, b) => {
  const sumTotal = a + b;
  return sumTotal;
};

export const getPost = () => {
  fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
    console.log(response);
  });
};

