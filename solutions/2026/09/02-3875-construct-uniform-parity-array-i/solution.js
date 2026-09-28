/**
 * 3875. Construct Uniform Parity Array I
 * https://leetcode.com/problems/construct-uniform-parity-array-i/
 *
 * Parity argument: if every value already shares a parity, keep them all. Otherwise the
 * array contains at least one odd value o. Aim for "all odd": odd values stay as they are,
 * and every even value e becomes e - o, which is even - odd = odd. So it is always possible.
 *
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function (nums1) {
  return true;
};

module.exports = { uniformArray };
