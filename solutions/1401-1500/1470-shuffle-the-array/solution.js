/**
 * 1470. Shuffle the Array
 * https://leetcode.com/problems/shuffle-the-array/
 * Interleave the two halves: output x_i then y_i, where y_i = nums[i + n].
 */
var shuffle = function (nums, n) {
  const out = new Array(2 * n);
  for (let i = 0; i < n; i++) {
    out[2 * i] = nums[i];
    out[2 * i + 1] = nums[i + n];
  }
  return out;
};

module.exports = { shuffle };
