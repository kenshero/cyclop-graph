const eiei = 5

export const sum = (a, b) => {
  const sumTotal = a + b
  return sumTotal
}

export const getPost = () => {
  fetch('https://jsonplaceholder.typicode.com/posts').then( response => {
    console.log(response)
  })
}

export default sum

console.log("Ma Lawwwwwee")