import 'whatwg-fetch';
import { mapDocWithVariables } from './common'

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
      const infoDoc = mapDocWithVariables(doc, variables)
      queryData = await fetchData(infoDoc, this.url)
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

