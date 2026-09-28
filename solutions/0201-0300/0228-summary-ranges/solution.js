/**
 * 228. Summary Ranges
 * https://leetcode.com/problems/summary-ranges/
 *
 * Scan runs of consecutive values in the sorted array and format each run.
 *
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const out = [];
  for (let i = 0; i < nums.length; ) {
    let j = i;
    while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
    out.push(i === j ? `${nums[i]}` : `${nums[i]}->${nums[j]}`);
    i = j + 1;
  }
  return out;
};

module.exports = { summaryRanges };
