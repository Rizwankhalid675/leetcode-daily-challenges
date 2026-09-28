/**
 * 345. Reverse Vowels of a String
 * https://leetcode.com/problems/reverse-vowels-of-a-string/
 *
 * Two pointers move inward, each skipping non-vowels; when both rest on vowels, swap.
 *
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const VOWELS = new Set('aeiouAEIOU');
  const chars = s.split('');
  let lo = 0;
  let hi = chars.length - 1;
  while (lo < hi) {
    if (!VOWELS.has(chars[lo])) lo++;
    else if (!VOWELS.has(chars[hi])) hi--;
    else {
      [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
      lo++;
      hi--;
    }
  }
  return chars.join('');
};

module.exports = { reverseVowels };
