const test = require('node:test');
const assert = require('node:assert');
const { gcdOfStrings } = require('./solution');

// Reference: try every prefix length from longest to shortest.
function brute(a, b) {
  const divides = (t, s) => s.length % t.length === 0 && t.repeat(s.length / t.length) === s;
  for (let len = Math.min(a.length, b.length); len > 0; len--) {
    const t = a.slice(0, len);
    if (divides(t, a) && divides(t, b)) return t;
  }
  return '';
}

test('official examples', () => {
  assert.strictEqual(gcdOfStrings('ABCABC', 'ABC'), 'ABC');
  assert.strictEqual(gcdOfStrings('ABABAB', 'ABAB'), 'AB');
  assert.strictEqual(gcdOfStrings('LEET', 'CODE'), '');
  assert.strictEqual(gcdOfStrings('AAAAAB', 'AAA'), '');
});

test('matches brute force on random repetitive strings', () => {
  for (let t = 0; t < 1000; t++) {
    const unit = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => 'AB'[Math.floor(Math.random() * 2)]).join('');
    const a = Math.random() < 0.7 ? unit.repeat(1 + Math.floor(Math.random() * 6)) : 'AB'.slice(Math.floor(Math.random() * 2)) + unit;
    const b = unit.repeat(1 + Math.floor(Math.random() * 6));
    assert.strictEqual(gcdOfStrings(a, b), brute(a, b), JSON.stringify([a, b]));
  }
});
