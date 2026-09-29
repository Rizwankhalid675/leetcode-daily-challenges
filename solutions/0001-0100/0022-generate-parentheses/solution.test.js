const test = require('node:test');
const assert = require('node:assert');
const { generateParenthesis } = require('./solution');

// Oracle: every string of length 2n over "()", keep the balanced ones.
function bruteForce(n) {
  const res = [];
  for (let mask = 0; mask < 1 << (2 * n); mask++) {
    let s = '', bal = 0, ok = true;
    for (let i = 2 * n - 1; i >= 0; i--) {
      const ch = (mask >> i) & 1 ? ')' : '(';
      s += ch;
      bal += ch === '(' ? 1 : -1;
      if (bal < 0) ok = false;
    }
    if (ok && bal === 0) res.push(s);
  }
  return res.sort();
}

test('official examples', () => {
  assert.deepStrictEqual(generateParenthesis(3).sort(), ['((()))', '(()())', '(())()', '()(())', '()()()']);
  assert.deepStrictEqual(generateParenthesis(1), ['()']);
});

test('matches brute force for n = 1..8', () => {
  for (let n = 1; n <= 8; n++) {
    const got = generateParenthesis(n);
    assert.strictEqual(new Set(got).size, got.length, 'no duplicates');
    assert.deepStrictEqual([...got].sort(), bruteForce(n));
  }
});

test('counts are Catalan numbers', () => {
  const catalan = [1, 1, 2, 5, 14, 42, 132, 429, 1430];
  for (let n = 1; n <= 8; n++) assert.strictEqual(generateParenthesis(n).length, catalan[n]);
});
