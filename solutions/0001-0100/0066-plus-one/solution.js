/**
 * 66. Plus One
 * https://leetcode.com/problems/plus-one/
 * Add one from the least-significant digit, propagating carry; all nines grow by one digit.
 */
var plusOne = function (digits) {
  const out = [...digits];
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i] < 9) {
      out[i]++;
      return out;
    }
    out[i] = 0;
  }
  return [1, ...out];
};

module.exports = { plusOne };
