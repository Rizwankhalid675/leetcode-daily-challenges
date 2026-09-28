/**
 * 3550. Smallest Index With Digit Sum Equal to Index
 * https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/
 *
 * Scan left to right, computing each digit sum with % 10 and integer division.
 *
 * @param {number[]} nums
 * @return {number}
 */
var smallestIndex = function (nums) {
  const digitSum = (v) => {
    let sum = 0;
    for (; v > 0; v = Math.floor(v / 10)) sum += v % 10;
    return sum;
  };
  for (let i = 0; i < nums.length; i++) {
    if (digitSum(nums[i]) === i) return i;
  }
  return -1;
};

module.exports = { smallestIndex };
