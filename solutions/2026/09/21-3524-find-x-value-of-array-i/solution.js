/**
 * 3524. Find X Value of Array I
 * https://leetcode.com/problems/find-x-value-of-array-i/
 *
 * Removing a prefix and a suffix leaves a non-empty subarray, so we must count subarrays by
 * (product mod k). k <= 5, so track, for subarrays ENDING at the current index, how many
 * have each residue. Extending to the next value v: every old residue r becomes r*v mod k,
 * plus the new single-element subarray [v].
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function (nums, k) {
  const result = new Array(k).fill(0);
  let endingHere = new Array(k).fill(0);
  for (const value of nums) {
    const v = value % k;
    const next = new Array(k).fill(0);
    for (let r = 0; r < k; r++) next[(r * v) % k] += endingHere[r];
    next[v] += 1;
    for (let r = 0; r < k; r++) result[r] += next[r];
    endingHere = next;
  }
  return result;
};

module.exports = { resultArray };
