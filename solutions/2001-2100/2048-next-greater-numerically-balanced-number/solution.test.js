const test = require('node:test');
const assert = require('node:assert');
const { nextBeautifulNumber } = require('./solution');

// Independent oracle: build every balanced number up to 7 digits from digit multisets.
function allBalanced() {
  const out = new Set();
  const permute = (digits) => {
    const used = new Array(digits.length).fill(false);
    const rec = (cur) => {
      if (cur.length === digits.length) { out.add(Number(cur)); return; }
      for (let i = 0; i < digits.length; i++) {
        if (used[i] || (i > 0 && digits[i] === digits[i - 1] && !used[i - 1])) continue;
        used[i] = true; rec(cur + digits[i]); used[i] = false;
      }
    };
    rec('');
  };
  for (let mask = 1; mask < 1 << 9; mask++) {
    let digits = '';
    for (let d = 1; d <= 9; d++) if (mask >> (d - 1) & 1) digits += String(d).repeat(d);
    if (digits.length <= 7) permute([...digits].sort().join(''));
  }
  return [...out].sort((a, b) => a - b);
}
const LIST = allBalanced();
const oracle = (n) => LIST.find((x) => x > n);

test('official examples', () => {
  assert.strictEqual(nextBeautifulNumber(1), 22);
  assert.strictEqual(nextBeautifulNumber(1000), 1333);
  assert.strictEqual(nextBeautifulNumber(3000), 3133);
});

test('boundaries', () => {
  assert.strictEqual(nextBeautifulNumber(0), 1);
  assert.strictEqual(nextBeautifulNumber(22), 122);
  assert.strictEqual(nextBeautifulNumber(1e6), 1224444);
});

test('matches the generated list around every balanced number and at random', () => {
  for (const x of LIST) {
    if (x > 1e6 + 1) break;
    for (const n of [x - 1, x, x + 1]) if (n >= 0 && n <= 1e6) assert.strictEqual(nextBeautifulNumber(n), oracle(n));
  }
  for (let t = 0; t < 200; t++) {
    const n = Math.floor(Math.random() * 1e6);
    assert.strictEqual(nextBeautifulNumber(n), oracle(n));
  }
});

test('largest gap under the limit is fast', () => {
  let worst = 0, at = 0;
  for (let i = 1; i < LIST.length && LIST[i - 1] <= 1e6; i++) if (LIST[i] - LIST[i - 1] > worst) { worst = LIST[i] - LIST[i - 1]; at = LIST[i - 1]; }
  const t0 = Date.now();
  assert.strictEqual(nextBeautifulNumber(at), at + worst);
  assert.ok(Date.now() - t0 < 500);
});
