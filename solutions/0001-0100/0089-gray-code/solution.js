/**
 * 89. Gray Code
 * https://leetcode.com/problems/gray-code/
 * The reflected binary Gray code: the i-th code is i ^ (i >> 1).
 */
var grayCode = function (n) {
  const total = 1 << n;
  const out = new Array(total);
  for (let i = 0; i < total; i++) out[i] = i ^ (i >> 1);
  return out;
};

module.exports = { grayCode };
