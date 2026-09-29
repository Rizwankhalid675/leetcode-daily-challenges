/**
 * 1887. Reduction Operations to Make the Array Elements Equal
 * https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal/
 * Sort descending. Each time the value drops, every element seen so far must step down once more, so add the current index at every drop.
 */
var reductionOperations = function (nums) {
  nums.sort((a, b) => b - a);
  let ops = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) ops += i;
  }
  return ops;
};

module.exports = { reductionOperations };
