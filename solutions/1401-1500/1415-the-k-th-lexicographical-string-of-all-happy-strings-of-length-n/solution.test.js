const test = require('node:test');
const assert = require('node:assert');
const { getHappyString } = require('./solution');

function brute(n, k) {
  const all = [];
  const dfs = (s) => {
    if (s.length === n) { all.push(s); return; }
    for (const c of 'abc') if (!s.length || s[s.length - 1] !== c) dfs(s + c);
  };
  dfs('');
  return all[k - 1] ?? '';
}

test('official examples', () => {
  assert.strictEqual(getHappyString(1, 3), 'c');
  assert.strictEqual(getHappyString(1, 4), '');
  assert.strictEqual(getHappyString(3, 9), 'cab');
});

test('matches enumeration for every n <= 10, k <= 100', () => {
  for (let n = 1; n <= 10; n++) {
    for (let k = 1; k <= 100; k++) assert.strictEqual(getHappyString(n, k), brute(n, k));
  }
});
