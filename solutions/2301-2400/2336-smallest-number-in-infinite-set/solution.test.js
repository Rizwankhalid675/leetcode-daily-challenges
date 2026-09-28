const test = require('node:test');
const assert = require('node:assert');
const { SmallestInfiniteSet } = require('./solution');

test('official example', () => {
  const s = new SmallestInfiniteSet();
  s.addBack(2); // already present: no effect
  assert.deepStrictEqual([s.popSmallest(), s.popSmallest(), s.popSmallest()], [1, 2, 3]);
  s.addBack(1);
  assert.deepStrictEqual([s.popSmallest(), s.popSmallest(), s.popSmallest()], [1, 4, 5]);
});

test('matches a boolean-array reference under random operations', () => {
  for (let t = 0; t < 200; t++) {
    const s = new SmallestInfiniteSet();
    const present = new Array(3000).fill(true);
    for (let op = 0; op < 300; op++) {
      if (Math.random() < 0.5) {
        const expected = present.indexOf(true, 1);
        present[expected] = false;
        assert.strictEqual(s.popSmallest(), expected);
      } else {
        const num = 1 + Math.floor(Math.random() * 30);
        present[num] = true;
        s.addBack(num);
      }
    }
  }
});
