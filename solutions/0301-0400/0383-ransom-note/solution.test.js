const test = require('node:test');
const assert = require('node:assert');
const { canConstruct } = require('./solution');

const reference = (note, mag) => {
  const pool = [...mag];
  for (const ch of note) {
    const i = pool.indexOf(ch);
    if (i === -1) return false;
    pool.splice(i, 1);
  }
  return true;
};

test('official examples', () => {
  assert.strictEqual(canConstruct('a', 'b'), false);
  assert.strictEqual(canConstruct('aa', 'ab'), false);
  assert.strictEqual(canConstruct('aa', 'aab'), true);
});

test('matches remove-from-pool reference', () => {
  for (let t = 0; t < 1000; t++) {
    const r = (n) => Array.from({ length: n }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const note = r(1 + Math.floor(Math.random() * 5));
    const mag = r(1 + Math.floor(Math.random() * 8));
    assert.strictEqual(canConstruct(note, mag), reference(note, mag));
  }
});
