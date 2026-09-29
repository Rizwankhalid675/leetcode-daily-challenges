const test = require('node:test');
const assert = require('node:assert');
const { grayCode } = require('./solution');

function assertValidGray(seq, n) {
  const total = 1 << n;
  assert.strictEqual(seq.length, total);
  assert.strictEqual(seq[0], 0);
  const seen = new Set(seq);
  assert.strictEqual(seen.size, total);
  for (const v of seq) assert.ok(v >= 0 && v < total);
  const oneBit = (x) => x !== 0 && (x & (x - 1)) === 0;
  for (let i = 0; i < total; i++) assert.ok(oneBit(seq[i] ^ seq[(i + 1) % total]), 'step ' + i);
}

test('official examples (any valid sequence accepted)', () => {
  assert.deepStrictEqual(grayCode(2), [0, 1, 3, 2]);
  assert.deepStrictEqual(grayCode(1), [0, 1]);
});

test('valid n-bit Gray code for every n up to 16', () => {
  for (let n = 1; n <= 16; n++) assertValidGray(grayCode(n), n);
});
