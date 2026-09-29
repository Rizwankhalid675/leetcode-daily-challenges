const test = require('node:test');
const assert = require('node:assert');
const { magicalString } = require('./solution');

function naive(n) {
  const s = [1, 2, 2];
  let i = 2;
  while (s.length < n) {
    const v = s[s.length - 1] === 1 ? 2 : 1;
    for (let c = 0; c < s[i]; c++) s.push(v);
    i++;
  }
  return s.slice(0, n).filter((x) => x === 1).length;
}

test('official examples', () => {
  assert.strictEqual(magicalString(6), 3);
  assert.strictEqual(magicalString(1), 1);
});

test('known prefix 1221121221221121122', () => {
  const pre = '1221121221221121122';
  for (let n = 1; n <= pre.length; n++) {
    assert.strictEqual(magicalString(n), [...pre.slice(0, n)].filter((c) => c === '1').length);
  }
});

test('matches naive generator up to 2000', () => {
  for (let n = 1; n <= 2000; n++) assert.strictEqual(magicalString(n), naive(n));
});

test('max n is fast', () => {
  const t = Date.now();
  assert.strictEqual(magicalString(100000), naive(100000));
  assert.ok(Date.now() - t < 1000);
});
