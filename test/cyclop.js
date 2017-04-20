import test from 'tape'
import { CyclopConnection } from '../src/cyclop'

test('test CyclopConnection', (t) => {
  const actual = new CyclopConnection({
    url: 'http://localhost:3000/graphql',
    headers: ''
  });
  const expected = { headers: '', url: 'http://localhost:3000/graphql' }
  t.equal(actual.url, expected.url)
  t.end()
});
