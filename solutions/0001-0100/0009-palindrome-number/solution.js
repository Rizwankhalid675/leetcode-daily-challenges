/**
 * 9. Palindrome Number
 * https://leetcode.com/problems/palindrome-number/
 * No string conversion: reverse only the lower half of the digits and compare it to the upper half.
 */
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let rev = 0;
  while (x > rev) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === rev || x === Math.floor(rev / 10);
};

module.exports = { isPalindrome };
