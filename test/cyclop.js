import test from 'tape';
import { sum } from '../src/cyclop';

test('test sum', (t) => {
  const actual = sum(1, 4);
  t.equal(actual, 5);
  t.end();
});
