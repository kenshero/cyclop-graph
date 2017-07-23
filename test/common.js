import test from 'tape'
import {
  mapDocWithVariables,
  getVariblesFromDocument,
  matchVar,
  replaceVariablestoDoc,
  processMapVars,
  isMatchVars,
  findMatchVariable,
  JsonToJsObj
} from '../src/common'
import {
  queryPrice,
  queryImages,
  queryPriceVars,
  queryImagesVars,
  queryProductAndOrder,
  queryProductAndOrderVars
} from './data/CommonData'


test('test mapDocWithVariables Single Field', (t) => {
  const actual = mapDocWithVariables(queryPrice, queryPriceVars)
  const expected = 'query {\n  getProductByPrice(price: 2000) {\n    _id\n    name\n    price\n    category\n  }\n}'
  t.equal(actual, expected)
  t.end()
});

test('test mapDocWithVariables Single Field Test Var Object', (t) => {
  const actual = mapDocWithVariables(queryImages, queryImagesVars)
  const expected = 'query {\n  getImages(images: [{name:"test_name",url:"www.xxxx.yyy"}]) {\n    _id\n    images\n  }\n}'
  t.equal(actual, expected)
  t.end()
});

test('test mapDocWithVariables Multiple Field', (t) => {
  const actual = mapDocWithVariables(queryProductAndOrder, queryProductAndOrderVars)
  const expected = 'query {\n  products {\n    _id\n    name\n    price\n  }\n  product(product_id: "1") {\n    _id\n    name\n    price\n  }\n  order(id: "2", order_name: "test mock") {\n    _id\n    name\n    price\n    amount\n    category\n    status\n  }\n}'
  t.equal(actual, expected)
  t.end()
});

test('test getVariblesFromDocument', (t) => {
  const actual = getVariblesFromDocument(queryPrice)
  const actual2 = getVariblesFromDocument(queryProductAndOrder)
  const expected = ['price: $price']
  const expected2 = ['product_id: $product_id', 'id: $id, order_name: $order_name']
  t.deepEqual(actual, expected)
  t.deepEqual(actual2, expected2)
  t.end()
});

test('test matchVar', (t) => {
  const varsFromDocument = ['price: $price']
  const varsFromDocument2 = ['product_id: $product_id', 'id: $id, order_name: $order_name']
  const actual = matchVar(varsFromDocument, queryPriceVars)
  const actual2 = matchVar(varsFromDocument2, queryProductAndOrderVars)
  const expected = ['price: 2000']
  const expected2 = ['product_id: "1"', 'id: "2", order_name: "test mock"']
  t.deepEqual(actual, expected)
  t.deepEqual(actual2, expected2)
  t.end()
});

test('test replaceVariablestoDoc', (t) => {
  const variablesSet = ['price: 2000']
  const variablesSet2 = ['product_id: "1"', 'id: 2, order_name: "test mock"']
  const actual = replaceVariablestoDoc(queryPrice, variablesSet)
  const actual2 = replaceVariablestoDoc(queryProductAndOrder, variablesSet2)
  const expected = 'query {\n  getProductByPrice(price: 2000) {\n    _id\n    name\n    price\n    category\n  }\n}'
  const expected2 = 'query {\n  products {\n    _id\n    name\n    price\n  }\n  product(product_id: "1") {\n    _id\n    name\n    price\n  }\n  order(id: 2, order_name: "test mock") {\n    _id\n    name\n    price\n    amount\n    category\n    status\n  }\n}'
  t.deepEqual(actual, expected)
  t.deepEqual(actual2, expected2)
  t.end()
});

test('test processMapVars', (t) => {
  const varsFromDocument = ['price: $price']
  const actual = processMapVars(varsFromDocument, queryPriceVars)
  const expected = ['price: 2000']
  t.deepEqual(actual, expected)
  t.end()
});

test('test processMapVars type Object', (t) => {
  const varsFromDocument = ['images: $images']
  const actual = processMapVars(varsFromDocument, queryImagesVars)
  const expected = ['images: [{name:"test_name",url:"www.xxxx.yyy"}]']
  t.deepEqual(actual, expected)
  t.end()
});

test('test JsonToJsObj', (t) => {
  const jsonData = {name:"test_name",url:"www.xxxx.yyy"}
  const actual = JsonToJsObj(jsonData)
  const expected = `{name:"test_name",url:"www.xxxx.yyy"}`
  t.deepEqual(actual, expected)
  t.end()
});

test('test ArrayOfJsonToJsObj', (t) => {
  const jsonData = [{name:"test_name",url:"www.xxxx.yyy"},{name:"test_name2",url:"www.xxxx.yyy2"}]
  const actual = JsonToJsObj(jsonData)
  const expected = `[{name:"test_name",url:"www.xxxx.yyy"},{name:"test_name2",url:"www.xxxx.yyy2"}]`
  t.deepEqual(actual, expected)
  t.end()
});

test('test isMatchVars', (t) => {
  const varsFromDocument = ['price: $price']
  const actual = isMatchVars(varsFromDocument, queryPriceVars)
  t.true(actual)
  t.end()
});

test('test findMatchVariable', (t) => {
  const varsFromDocument = 'price: $price'
  const varsFromDocument2 = 'price: $price2'
  // const varsFromDocument3 = 'price: 1$price'
  const varsFromDocument4 = 'price: 1$price3'
  const actual = findMatchVariable(varsFromDocument, 'price')
  const actual2 = findMatchVariable(varsFromDocument2, 'price')
  // const actual3 = findMatchVariable(varsFromDocument3, 'price')
  const actual4 = findMatchVariable(varsFromDocument4, 'price')
  t.equal(actual, 8)
  t.equal(actual2, -1)
  // t.equal(actual3, -1)
  t.equal(actual4, -1)
  t.end()
});
