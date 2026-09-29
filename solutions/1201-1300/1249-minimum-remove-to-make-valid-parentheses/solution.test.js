const test = require('node:test');
const assert = require('node:assert');
const { minRemoveToMakeValid } = require('./solution');

function isValid(t) {
  let bal = 0;
  for (const c of t) {
    if (c === '(') bal++;
    else if (c === ')' && --bal < 0) return false;
  }
  return bal === 0;
}
function minRemovals(s) {
  let bal = 0, extraClose = 0;
  for (const c of s) {
    if (c === '(') bal++;
    else if (c === ')') { if (bal > 0) bal--; else extraClose++; }
  }
  return bal + extraClose;
}
function isSubsequenceKeepingLetters(r, s) {
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (j < r.length && r[j] === s[i]) j++;
    else if (s[i] !== '(' && s[i] !== ')') return false;
  }
  return j === r.length;
}
function check(s) {
  const r = minRemoveToMakeValid(s);
  assert.ok(isValid(r), s + ' -> ' + r);
  assert.strictEqual(s.length - r.length, minRemovals(s));
  assert.ok(isSubsequenceKeepingLetters(r, s));
}

test('official examples', () => {
  const r1 = minRemoveToMakeValid('lee(t(c)o)de)');
  assert.ok(['lee(t(c)o)de', 'lee(t(co)de)', 'lee(t(c)ode)'].includes(r1));
  assert.strictEqual(minRemoveToMakeValid('a)b(c)d'), 'ab(c)d');
  assert.strictEqual(minRemoveToMakeValid('))(('), '');
});

test('brute-force minimum on tiny strings', () => {
  // exhaustive: smallest number of removed parens that yields a valid string
  const brute = (s) => {
    const idx = [...s].map((c, i) => (c === '(' || c === ')' ? i : -1)).filter((i) => i >= 0);
    let best = Infinity;
    for (let mask = 0; mask < 1 << idx.length; mask++) {
      const del = new Set(idx.filter((_, b) => mask >> b & 1));
      const t = [...s].filter((_, i) => !del.has(i)).join('');
      if (isValid(t)) best = Math.min(best, del.size);
    }
    return best;
  };
  for (let t = 0; t < 300; t++) {
    const s = Array.from({ length: Math.floor(Math.random() * 10) }, () => '()a'[Math.floor(Math.random() * 3)]).join('');
    assert.strictEqual(s.length - minRemoveToMakeValid(s).length, brute(s));
    check(s);
  }
});

test('random larger strings are valid and minimal', () => {
  for (let t = 0; t < 200; t++) {
    const s = Array.from({ length: Math.floor(Math.random() * 200) }, () => '()xy'[Math.floor(Math.random() * 4)]).join('');
    check(s);
  }
});

test('max size runs fast', () => {
  const s = '('.repeat(50000) + ')'.repeat(50000);
  const t0 = Date.now();
  assert.strictEqual(minRemoveToMakeValid(s), s);
  assert.strictEqual(minRemoveToMakeValid(')'.repeat(1e5)), '');
  assert.ok(Date.now() - t0 < 500);
});
