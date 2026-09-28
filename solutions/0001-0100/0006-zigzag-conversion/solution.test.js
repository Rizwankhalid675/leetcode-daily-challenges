const test = require('node:test');
const assert = require('node:assert');
const { convert } = require('./solution');

// Reference: index arithmetic with cycle length 2*(numRows-1).
function byCycle(s, numRows) {
  if (numRows === 1) return s;
  const cycle = 2 * (numRows - 1);
  let out = '';
  for (let r = 0; r < numRows; r++) {
    for (let i = 0; i < s.length; i++) {
      const pos = i % cycle;
      if (pos === r || pos === cycle - r) out += s[i];
    }
  }
  return out;
}

test('official examples', () => {
  assert.strictEqual(convert('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR');
  assert.strictEqual(convert('PAYPALISHIRING', 4), 'PINALSIGYAHRPI');
  assert.strictEqual(convert('A', 1), 'A');
});

test('matches cycle arithmetic', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, (_, i) => String.fromCharCode(65 + (i % 26))).join('');
    const rows = 1 + Math.floor(Math.random() * 25);
    assert.strictEqual(convert(s, rows), byCycle(s, rows), JSON.stringify([s, rows]));
  }
});
