const test = require('node:test');
const assert = require('node:assert');
const { isInterleave } = require('./solution');

// Oracle: plain recursion over (i, j) without memo, for short strings.
function brute(a, b, c) {
  if (a.length + b.length !== c.length) return false;
  const go = (i, j) => {
    if (i + j === c.length) return true;
    return (i < a.length && a[i] === c[i + j] && go(i + 1, j)) || (j < b.length && b[j] === c[i + j] && go(i, j + 1));
  };
  return go(0, 0);
}

function shuffleMerge(a, b) {
  let i = 0;
  let j = 0;
  let out = '';
  while (i < a.length || j < b.length) {
    if (j === b.length || (i < a.length && Math.random() < 0.5)) out += a[i++];
    else out += b[j++];
  }
  return out;
}

const rnd = (len) => Array.from({ length: len }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');

test('official examples', () => {
  assert.strictEqual(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'), true);
  assert.strictEqual(isInterleave('aabcc', 'dbbca', 'aadbbbaccc'), false);
  assert.strictEqual(isInterleave('', '', ''), true);
});

test('length mismatch and empty sides', () => {
  assert.strictEqual(isInterleave('a', '', 'a'), true);
  assert.strictEqual(isInterleave('', 'b', 'b'), true);
  assert.strictEqual(isInterleave('a', 'b', 'a'), false);
  assert.strictEqual(isInterleave('', '', 'a'), false);
});

test('matches recursion on random inputs (true and false cases)', () => {
  for (let t = 0; t < 2000; t++) {
    const a = rnd(Math.floor(Math.random() * 6));
    const b = rnd(Math.floor(Math.random() * 6));
    const c = Math.random() < 0.5 ? shuffleMerge(a, b) : rnd(a.length + b.length);
    assert.strictEqual(isInterleave(a, b, c), brute(a, b, c), JSON.stringify([a, b, c]));
  }
});

test('max size', () => {
  const a = 'a'.repeat(100);
  const b = 'a'.repeat(99) + 'b';
  assert.strictEqual(isInterleave(a, b, 'a'.repeat(199) + 'b'), true);
  assert.strictEqual(isInterleave(a, b, 'b' + 'a'.repeat(199)), false);
});
