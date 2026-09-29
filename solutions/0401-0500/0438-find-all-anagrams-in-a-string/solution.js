/**
 * 438. Find All Anagrams in a String
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/
 * Fixed-size sliding window of length |p| with letter counts; a running "mismatched letters" counter makes each slide O(1).
 */
var findAnagrams = function (s, p) {
  const res = [];
  const m = p.length;
  if (m > s.length) return res;
  const diff = new Array(26).fill(0); // window count minus p count
  for (let i = 0; i < m; i++) {
    diff[p.charCodeAt(i) - 97]--;
    diff[s.charCodeAt(i) - 97]++;
  }
  let bad = 0;
  for (let k = 0; k < 26; k++) if (diff[k] !== 0) bad++;
  if (bad === 0) res.push(0);
  const bump = (k, d) => {
    if (diff[k] === 0) bad++;
    diff[k] += d;
    if (diff[k] === 0) bad--;
  };
  for (let i = m; i < s.length; i++) {
    bump(s.charCodeAt(i) - 97, 1);
    bump(s.charCodeAt(i - m) - 97, -1);
    if (bad === 0) res.push(i - m + 1);
  }
  return res;
};

module.exports = { findAnagrams };
