const test = require('node:test');
const assert = require('node:assert');
const { rotateString } = require('./solution');

test('examples', () => {
  assert.strictEqual(rotateString('abcde', 'cdeab'), true);
  assert.strictEqual(rotateString('abcde', 'abced'), false);
  assert.strictEqual(rotateString('m', 'f'), false);
  assert.strictEqual(rotateString('c', 'c'), true);
});

test('matches explicit rotations', () => {
  for (let t = 0; t < 2000; t++) {
    const r = (n) => Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const s = r(1 + Math.floor(Math.random() * 6));
    const g = Math.random() < 0.5 ? r(s.length) : r(1 + Math.floor(Math.random() * 6));
    const expected = [...s].some((_, i) => s.slice(i) + s.slice(0, i) === g);
    assert.strictEqual(rotateString(s, g), expected);
  }
});
