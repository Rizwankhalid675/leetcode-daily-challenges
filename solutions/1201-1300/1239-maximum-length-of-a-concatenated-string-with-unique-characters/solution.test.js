const test = require('node:test');
const assert = require('node:assert');
const { maxLength } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function brute(arr) {
  let best = 0;
  for (let s = 0; s < 1 << arr.length; s++) {
    let str = '';
    for (let i = 0; i < arr.length; i++) if (s >> i & 1) str += arr[i];
    if (new Set(str).size === str.length) best = Math.max(best, str.length);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxLength(['un', 'iq', 'ue']), 4);
  assert.strictEqual(maxLength(['cha', 'r', 'act', 'ers']), 6);
  assert.strictEqual(maxLength(['abcdefghijklmnopqrstuvwxyz']), 26);
});

test('edge cases', () => {
  assert.strictEqual(maxLength(['aa', 'bb']), 0); // strings with their own repeats are unusable
  assert.strictEqual(maxLength(['aa', 'b']), 1);
  assert.strictEqual(maxLength(['z', 'y', 'zy']), 2);
});

test('matches subset brute force', () => {
  const letters = 'abcdefghij';
  for (let t = 0; t < 400; t++) {
    const arr = Array.from({ length: rint(1, 10) }, () => Array.from({ length: rint(1, 4) }, () => letters[rint(0, letters.length - 1)]).join(''));
    assert.strictEqual(maxLength(arr), brute(arr), JSON.stringify(arr));
  }
});

test('worst case: 16 single distinct letters (2^16 states) runs fast', () => {
  const arr = 'abcdefghijklmnop'.split('');
  const t0 = Date.now();
  assert.strictEqual(maxLength(arr), 16);
  assert.ok(Date.now() - t0 < 1000);
});
