const test = require('node:test');
const assert = require('node:assert');
const { removeDuplicates } = require('./solution');

// Oracle: repeatedly delete the first run of k equal letters until none is left.
function bruteForce(s, k) {
  for (;;) {
    let found = -1;
    for (let i = 0; i + k <= s.length && found < 0; i++) {
      let ok = true;
      for (let j = 1; j < k; j++) if (s[i + j] !== s[i]) { ok = false; break; }
      if (ok) found = i;
    }
    if (found < 0) return s;
    s = s.slice(0, found) + s.slice(found + k);
  }
}

test('official examples', () => {
  assert.strictEqual(removeDuplicates('abcd', 2), 'abcd');
  assert.strictEqual(removeDuplicates('deeedbbcccbdaa', 3), 'aa');
  assert.strictEqual(removeDuplicates('pbbcggttciiippooaais', 2), 'ps');
});

test('edge cases', () => {
  assert.strictEqual(removeDuplicates('aaaa', 2), '');
  assert.strictEqual(removeDuplicates('aaa', 2), 'a');
  assert.strictEqual(removeDuplicates('abba', 2), '');
  assert.strictEqual(removeDuplicates('aaaaa', 5), '');
});

test('matches repeated deletion on random strings', () => {
  for (let t = 0; t < 2000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 14) }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const k = 2 + Math.floor(Math.random() * 3);
    assert.strictEqual(removeDuplicates(s, k), bruteForce(s, k));
  }
});

test('1e5 characters finish quickly', () => {
  const s = Array.from({ length: 100000 }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
  const t0 = Date.now();
  removeDuplicates(s, 2);
  removeDuplicates('a'.repeat(100000), 10000);
  assert.ok(Date.now() - t0 < 1000);
});
