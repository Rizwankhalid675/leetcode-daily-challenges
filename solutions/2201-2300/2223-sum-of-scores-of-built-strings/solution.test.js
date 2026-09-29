const test = require('node:test');
const assert = require('node:assert');
const { sumScores } = require('./solution');

function brute(s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    let k = 0;
    while (i + k < s.length && s[k] === s[i + k]) k++;
    total += k;
  }
  return total;
}

test('official examples', () => {
  assert.strictEqual(sumScores('babab'), 9);
  assert.strictEqual(sumScores('azbazbzaz'), 14);
});

test('matches brute force', () => {
  for (let t = 0; t < 1500; t++) {
    const n = 1 + Math.floor(Math.random() * 16);
    const s = Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(sumScores(s), brute(s));
  }
});

test('max size: all same letter gives n(n+1)/2 and runs fast', () => {
  const n = 100000;
  const t = Date.now();
  assert.strictEqual(sumScores('a'.repeat(n)), (n * (n + 1)) / 2);
  assert.strictEqual(sumScores('a'.repeat(n - 1) + 'b'), n + ((n - 2) * (n - 1)) / 2);
  assert.ok(Date.now() - t < 1000);
});
