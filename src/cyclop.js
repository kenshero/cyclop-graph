import 'whatwg-fetch';

const fetchData = async (doc) => {
  let queryData;
  try {
    const response = await fetch('http://localhost:3000/graphql', {
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
  return queryData;
}

const queryStation = async (doc, variables=null) => {
  let queryStationData;
  if(variables) {
  } else {
    queryStationData = await fetchData(doc)
  }
  return queryStationData;
}

const mutation = (url, headers) => {
  console.log(url);
  console.log("aa");
}

export const ConnectionGraphql = (network) => {
  console.log(network);
  const {url, headers} = network;

  const method = {
    query: queryStation,
    mutate: mutation
  };
  return method
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

export default sum;
