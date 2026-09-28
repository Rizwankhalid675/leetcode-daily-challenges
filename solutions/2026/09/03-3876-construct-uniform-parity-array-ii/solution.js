/**
 * 3876. Construct Uniform Parity Array II
 * https://leetcode.com/problems/construct-uniform-parity-array-ii/
 *
 * A replacement nums1[i] - nums1[j] must now be >= 1, so j must hold a smaller value.
 * - "All even" is only possible with no odd values at all: the smallest odd value has no
 *   smaller odd value to subtract, so it can never become even.
 * - "All odd": every even value needs a smaller odd value to subtract, which holds exactly
 *   when the smallest odd value is below the smallest even value.
 *
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function (nums1) {
  let minOdd = Infinity;
  let minEven = Infinity;
  for (const x of nums1) {
    if (x % 2 === 1) {
      if (x < minOdd) minOdd = x;
    } else if (x < minEven) {
      minEven = x;
    }
  }
  // No odd values -> already all even. Otherwise the only reachable target is all odd.
  return minOdd === Infinity || minOdd < minEven;
};

module.exports = { uniformArray };
