import test from 'tape'
import { ConnectionGraphql } from '../src/cyclop'

test('test ConnectionGraphql', (t) => {
  const actual = new ConnectionGraphql({
    url: 'http://localhost:3000/graphql',
    headers: ''
  });
  const expected = { headers: '', url: 'http://localhost:3000/graphql' }
  t.equal(actual.url, expected.url)
  t.end()
});
