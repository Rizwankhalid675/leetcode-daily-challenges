/**
 * 645. Set Mismatch
 * https://leetcode.com/problems/set-mismatch/
 * Count occurrences of 1..n: the value seen twice is the duplicate, the value seen zero times is missing.
 */
var findErrorNums = function (nums) {
  const n = nums.length;
  const count = new Array(n + 1).fill(0);
  for (const x of nums) count[x]++;
  let dup = -1;
  let missing = -1;
  for (let v = 1; v <= n; v++) {
    if (count[v] === 2) dup = v;
    else if (count[v] === 0) missing = v;
  }
  return [dup, missing];
};

module.exports = { findErrorNums };
