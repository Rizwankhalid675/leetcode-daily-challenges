/**
 * 76. Minimum Window Substring
 * https://leetcode.com/problems/minimum-window-substring/
 *
 * Sliding window with a "missing" counter: need[c] = how many more c the window needs.
 * Extend right until nothing is missing, then shrink from the left while still valid,
 * recording the smallest valid window.
 *
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let missing = t.length;
  let bestStart = 0;
  let bestLen = Infinity;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      if (need.get(c) > 0) missing--;
      need.set(c, need.get(c) - 1); // may go negative: surplus copies
    }
    while (missing === 0) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
      }
      const d = s[left++];
      if (need.has(d)) {
        need.set(d, need.get(d) + 1);
        if (need.get(d) > 0) missing++;
      }
    }
  }
  return bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);
};

module.exports = { minWindow };
