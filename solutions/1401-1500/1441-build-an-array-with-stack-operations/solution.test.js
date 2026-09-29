const test = require('node:test');
const assert = require('node:assert');
const { buildArray } = require('./solution');

// Reference check: replay the operations and compare the final stack with target.
const replay = (ops) => { const st = []; let x = 1; for (const op of ops) op === 'Push' ? st.push(x++) : st.pop(); return st; };

test('official examples', () => {
  assert.deepStrictEqual(buildArray([1, 3], 3), ['Push', 'Push', 'Pop', 'Push']);
  assert.deepStrictEqual(buildArray([1, 2, 3], 3), ['Push', 'Push', 'Push']);
  assert.deepStrictEqual(buildArray([1, 2], 4), ['Push', 'Push']);
});

test('replaying the operations produces target', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const target = Array.from({ length: n }, (_, i) => i + 1).filter(() => Math.random() < 0.5);
    if (!target.length) target.push(n);
    assert.deepStrictEqual(replay(buildArray(target, n)), target);
  }
});
