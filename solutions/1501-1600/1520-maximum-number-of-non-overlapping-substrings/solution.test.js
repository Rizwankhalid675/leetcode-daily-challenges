const test = require('node:test');
const assert = require('node:assert');
const { maxNumOfSubstrings } = require('./solution');

// Reference: every closed substring, then DP over prefixes for (max count, min total length).
function brute(s) {
  const n = s.length;
  const closed = (i, j) => {
    const inside = new Set(s.slice(i, j + 1));
    for (let k = 0; k < n; k++) if ((k < i || k > j) && inside.has(s[k])) return false;
    return true;
  };
  // dp[i] = [count, totalLength, pieces] best for s[0..i)
  const dp = [[0, 0, []]];
  for (let i = 1; i <= n; i++) {
    let best = dp[i - 1];
    for (let j = 0; j < i; j++) {
      if (!closed(j, i - 1)) continue;
      const cand = [dp[j][0] + 1, dp[j][1] + (i - j), [...dp[j][2], s.slice(j, i)]];
      if (cand[0] > best[0] || (cand[0] === best[0] && cand[1] < best[1])) best = cand;
    }
    dp.push(best);
  }
  return dp[n][2];
}

const norm = (a) => [...a].sort();

test('official examples (any order accepted)', () => {
  assert.deepStrictEqual(norm(maxNumOfSubstrings('adefaddaccc')), norm(['e', 'f', 'ccc']));
  assert.deepStrictEqual(norm(maxNumOfSubstrings('abbaccd')), norm(['d', 'bb', 'cc']));
});

test('edge cases', () => {
  assert.deepStrictEqual(maxNumOfSubstrings('a'), ['a']);
  assert.deepStrictEqual(maxNumOfSubstrings('abab'), ['abab']); // only the whole string is closed
  assert.deepStrictEqual(norm(maxNumOfSubstrings('abc')), ['a', 'b', 'c']);
});

test('matches the exhaustive DP on random strings', () => {
  for (let t = 0; t < 800; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const s = Array.from({ length: n }, () => 'abcd'[Math.floor(Math.random() * 4)]).join('');
    assert.deepStrictEqual(norm(maxNumOfSubstrings(s)), norm(brute(s)), s);
  }
});
