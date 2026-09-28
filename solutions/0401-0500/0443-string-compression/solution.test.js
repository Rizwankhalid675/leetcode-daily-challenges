const test = require('node:test');
const assert = require('node:assert');
const { compress } = require('./solution');

// Reference: build the compressed string separately.
function reference(chars) {
  let s = '';
  for (let i = 0; i < chars.length; ) {
    let j = i;
    while (j < chars.length && chars[j] === chars[i]) j++;
    s += chars[i] + (j - i > 1 ? String(j - i) : '');
    i = j;
  }
  return s.split('');
}

const check = (input) => {
  const chars = [...input];
  const len = compress(chars);
  assert.deepStrictEqual(chars.slice(0, len), reference(input), JSON.stringify(input));
};

test('official examples', () => {
  const a = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
  assert.strictEqual(compress(a), 6);
  assert.deepStrictEqual(a.slice(0, 6), ['a', '2', 'b', '2', 'c', '3']);
  assert.strictEqual(compress(['a']), 1);
  const c = ['a', ...Array(12).fill('b')];
  assert.strictEqual(compress(c), 4);
  assert.deepStrictEqual(c.slice(0, 4), ['a', 'b', '1', '2']);
});

test('edge cases', () => {
  check(Array(2000).fill('z')); // four-digit count
  check(['a', 'b', 'c']); // all singletons
  check(['1', '1', '1']); // digit characters as data
  check(['a', 'a', 'a', 'b', 'b', 'a', 'a']); // same char in separate groups
});

test('matches reference on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    check(Array.from({ length: 1 + Math.floor(Math.random() * 30) }, () => 'ab#'[Math.floor(Math.random() * 3)]));
  }
});
