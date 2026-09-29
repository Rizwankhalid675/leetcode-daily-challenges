/**
 * 1239. Maximum Length of a Concatenated String with Unique Characters
 * https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/
 * Turn each string into a 26-bit mask (dropping strings with repeated letters), then grow the set of reachable disjoint unions string by string and track the largest popcount.
 */
var maxLength = function (arr) {
  const popcount = (m) => {
    let c = 0;
    while (m) {
      m &= m - 1;
      c++;
    }
    return c;
  };
  let reachable = [0];
  let best = 0;
  for (const s of arr) {
    let mask = 0;
    let valid = true;
    for (let i = 0; i < s.length; i++) {
      const bit = 1 << (s.charCodeAt(i) - 97);
      if (mask & bit) { valid = false; break; }
      mask |= bit;
    }
    if (!valid) continue;
    const size = reachable.length;
    for (let i = 0; i < size; i++) {
      const cur = reachable[i];
      if ((cur & mask) === 0) {
        const merged = cur | mask;
        reachable.push(merged);
        best = Math.max(best, popcount(merged));
      }
    }
  }
  return best;
};

module.exports = { maxLength };
