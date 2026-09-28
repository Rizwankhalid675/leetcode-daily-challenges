/**
 * 1456. Maximum Number of Vowels in a Substring of Given Length
 * https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 *
 * Fixed-size sliding window counting vowels: +1 when a vowel enters, -1 when one leaves.
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const isVowel = (c) => c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
  let count = 0;
  for (let i = 0; i < k; i++) if (isVowel(s[i])) count++;
  let best = count;
  for (let i = k; i < s.length && best < k; i++) {
    if (isVowel(s[i])) count++;
    if (isVowel(s[i - k])) count--;
    if (count > best) best = count;
  }
  return best;
};

module.exports = { maxVowels };
