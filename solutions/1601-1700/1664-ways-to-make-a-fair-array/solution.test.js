const test = require('node:test');
const assert = require('node:assert');
const { waysToMakeFair } = require('./solution');

function brute(a) {
  let c = 0;
  for (let i = 0; i < a.length; i++) {
    const b = a.filter((_, j) => j !== i);
    let e = 0, o = 0;
    b.forEach((x, j) => (j % 2 ? (o += x) : (e += x)));
    if (e === o) c++;
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(waysToMakeFair([2, 1, 6, 4]), 1);
  assert.strictEqual(waysToMakeFair([1, 1, 1]), 3);
  assert.strictEqual(waysToMakeFair([1, 2, 3]), 0);
});

test('single element is always fair after removal', () => {
  assert.strictEqual(waysToMakeFair([7]), 1);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 9) }, () => 1 + Math.floor(Math.random() * 4));
    assert.strictEqual(waysToMakeFair(a), brute(a));
  }
});
