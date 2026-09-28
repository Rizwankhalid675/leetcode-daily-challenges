const test = require('node:test');
const assert = require('node:assert');
const { minWindow } = require('./solution');

// Reference: shortest length over all windows that cover t (ties: any; compare lengths only).
function bestLen(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let best = Infinity;
  for (let i = 0; i < s.length; i++) {
    const have = {};
    for (let j = i; j < s.length; j++) {
      have[s[j]] = (have[s[j]] || 0) + 1;
      if (Object.keys(need).every((c) => (have[c] || 0) >= need[c])) {
        best = Math.min(best, j - i + 1);
        break;
      }
    }
  }
  return best === Infinity ? 0 : best;
}
const covers = (w, t) => {
  const cnt = {};
  for (const c of w) cnt[c] = (cnt[c] || 0) + 1;
  for (const c of t) if (!cnt[c]--) return false;
  return true;
};

test('official examples', () => {
  assert.strictEqual(minWindow('ADOBECODEBANC', 'ABC'), 'BANC');
  assert.strictEqual(minWindow('a', 'a'), 'a');
  assert.strictEqual(minWindow('a', 'aa'), ''); // duplicates in t must all be covered
});

test('random: result covers t and has minimum length', () => {
  for (let k = 0; k < 1000; k++) {
    const r = (n) => Array.from({ length: n }, () => 'aAb'[Math.floor(Math.random() * 3)]).join('');
    const s = r(1 + Math.floor(Math.random() * 12));
    const t = r(1 + Math.floor(Math.random() * 3));
    const w = minWindow(s, t);
    const expectedLen = bestLen(s, t);
    assert.strictEqual(w.length, expectedLen, JSON.stringify([s, t, w]));
    if (w) assert.ok(s.includes(w) && covers(w, t));
  }
});
