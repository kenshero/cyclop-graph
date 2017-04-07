import 'whatwg-fetch';


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

// const queryStation = async (doc, variables=null) => {
//   let queryStationData;
//   if(variables) {
//   } else {
//     queryStationData = await fetchData(doc)
//   }
//   return queryStationData;
// }


export function ConnectionGraphql(network){
  const {url, headers} = network;
  this.url = url;
  this.headers = headers;
  this.query = async function(doc, variables=null) {
    let queryStationData;
    if(variables) {
    } else {
      queryStationData = await fetchData(doc, this.url)
    }
    return queryStationData;
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

