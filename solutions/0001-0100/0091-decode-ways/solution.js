/**
 * 91. Decode Ways
 * https://leetcode.com/problems/decode-ways/
 * Climbing-stairs DP over prefixes: the last letter uses one digit (if not 0) or two digits (if 10..26).
 */
var numDecodings = function (s) {
  const n = s.length;
  let prev2 = 1; // ways for prefix of length i - 2
  let prev1 = s[0] === '0' ? 0 : 1; // ways for prefix of length i - 1
  for (let i = 2; i <= n; i++) {
    let cur = 0;
    if (s[i - 1] !== '0') cur += prev1;
    const two = (s.charCodeAt(i - 2) - 48) * 10 + (s.charCodeAt(i - 1) - 48);
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
};

module.exports = { numDecodings };
