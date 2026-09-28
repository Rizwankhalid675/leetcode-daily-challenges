const test = require('node:test');
const assert = require('node:assert');
const { removeStars } = require('./solution');

// Reference: literally apply the operation to the leftmost star until none remain.
function brute(s) {
  while (s.includes('*')) {
    const i = s.indexOf('*');
    s = s.slice(0, i - 1) + s.slice(i + 1);
  }
  return s;
}

test('official examples', () => {
  assert.strictEqual(removeStars('leet**cod*e'), 'lecoe');
  assert.strictEqual(removeStars('erase*****'), '');
});

test('matches literal simulation on valid random inputs', () => {
  for (let t = 0; t < 1000; t++) {
    let s = '';
    let letters = 0;
    for (let i = 0; i < 1 + Math.floor(Math.random() * 15); i++) {
      if (letters > 0 && Math.random() < 0.4) (s += '*'), letters--;
      else (s += 'abc'[Math.floor(Math.random() * 3)]), letters++;
    }
    assert.strictEqual(removeStars(s), brute(s), s);
  }
});
