/**
 * 242. Valid Anagram
 * https://leetcode.com/problems/valid-anagram/
 *
 * Same length and same letter counts: +1 for each letter of s, -1 for each letter of t,
 * and every count must end at zero.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++;
    counts[t.charCodeAt(i) - 97]--;
  }
  return counts.every((c) => c === 0);
};

module.exports = { isAnagram };
