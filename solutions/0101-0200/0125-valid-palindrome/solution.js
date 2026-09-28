/**
 * 125. Valid Palindrome
 * https://leetcode.com/problems/valid-palindrome/
 *
 * Two pointers moving inward, skipping non-alphanumeric characters and comparing the
 * rest case-insensitively. No filtered copy is built.
 *
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const isAlnum = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
  let lo = 0;
  let hi = s.length - 1;
  while (lo < hi) {
    if (!isAlnum(s[lo])) lo++;
    else if (!isAlnum(s[hi])) hi--;
    else if (s[lo].toLowerCase() !== s[hi].toLowerCase()) return false;
    else {
      lo++;
      hi--;
    }
  }
  return true;
};

module.exports = { isPalindrome };
