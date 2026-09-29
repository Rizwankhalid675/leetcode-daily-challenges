/**
 * 1822. Sign of the Product of an Array
 * https://leetcode.com/problems/sign-of-the-product-of-an-array/
 * Only the sign matters: return 0 on any zero, otherwise flip the sign for each negative. No product is formed, so no overflow.
 */
var arraySign = function (nums) {
  let sign = 1;
  for (const x of nums) {
    if (x === 0) return 0;
    if (x < 0) sign = -sign;
  }
  return sign;
};

module.exports = { arraySign };
