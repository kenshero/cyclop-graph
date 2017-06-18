import fetch from 'isomorphic-unfetch'
import { mapDocWithVariables } from './common'

const fetchData = async (doc, url, customHeaders) => {
  let data
  const defaultHeaders = {
    'Content-Type': 'application/graphql'
  }
  const headers = Object.assign(defaultHeaders, customHeaders)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: doc
    })
    data = await response.json()
  } catch (errors) {
    console.error(errors)
  }
  return data
}

export function CyclopConnection(network) {
  const { url, headers } = network
  this.url = url
  this.headers = headers
  this.query = async function (doc, variables = null) {
    let queryData
    if (variables != null) {
      const infoDoc = mapDocWithVariables(doc, variables)
      queryData = await fetchData(infoDoc, this.url, this.headers)
    } else {
      queryData = await fetchData(doc, this.url, this.headers)
    }
    return queryData
  } // query
  this.mutate = async function (doc, variables = null) {
    let queryData
    if (variables != null) {
      const infoDoc = mapDocWithVariables(doc, variables)
      queryData = await fetchData(infoDoc, this.url, this.headers)
    } else {
      throw 'Not Found Variables'
    }
    return queryData
  } // mutate
}
