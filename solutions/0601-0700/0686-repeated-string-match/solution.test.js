const test = require('node:test');
const assert = require('node:assert');
const { repeatedStringMatch } = require('./solution');

function brute(a, b) {
  for (let k = 1; k <= Math.ceil(b.length / a.length) + 3; k++) if (a.repeat(k).includes(b)) return k;
  return -1;
}

test('official examples', () => {
  assert.strictEqual(repeatedStringMatch('abcd', 'cdabcdab'), 3);
  assert.strictEqual(repeatedStringMatch('a', 'aa'), 2);
});

test('matches bounded brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const r = (n) => Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const a = r(1 + Math.floor(Math.random() * 3));
    const b = r(1 + Math.floor(Math.random() * 8));
    assert.strictEqual(repeatedStringMatch(a, b), brute(a, b), JSON.stringify([a, b]));
  }
});
