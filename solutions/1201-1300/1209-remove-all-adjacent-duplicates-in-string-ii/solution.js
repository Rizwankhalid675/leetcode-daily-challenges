/**
 * 1209. Remove All Adjacent Duplicates in String II
 * https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/
 * Stack of [char, runLength]. Extend the top run or push a new one; when a run reaches k, pop it,
 * which also lets the runs on both sides meet naturally.
 */
var removeDuplicates = function (s, k) {
  const chars = [], counts = [];
  for (const ch of s) {
    const top = chars.length - 1;
    if (top >= 0 && chars[top] === ch) {
      if (++counts[top] === k) { chars.pop(); counts.pop(); }
    } else {
      chars.push(ch);
      counts.push(1);
    }
  }
  let out = '';
  for (let i = 0; i < chars.length; i++) out += chars[i].repeat(counts[i]);
  return out;
};

module.exports = { removeDuplicates };
