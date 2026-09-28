/**
 * 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum
 * https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/
 *
 * All values are positive, so a sliding window finds every subarray with sum == target.
 * bestEndingBy[i] = length of the shortest target-sum subarray that ends at or before i.
 * When a window [left..right] hits the target, pair it with bestEndingBy[left - 1]: the best
 * subarray that finishes strictly before this one starts.
 *
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function (arr, target) {
  const n = arr.length;
  const bestEndingBy = new Array(n).fill(Infinity);
  let answer = Infinity;
  let left = 0;
  let sum = 0;

  for (let right = 0; right < n; right++) {
    sum += arr[right];
    while (sum > target) sum -= arr[left++];

    let best = right > 0 ? bestEndingBy[right - 1] : Infinity;
    if (sum === target) {
      const len = right - left + 1;
      if (left > 0 && bestEndingBy[left - 1] !== Infinity) {
        answer = Math.min(answer, bestEndingBy[left - 1] + len);
      }
      best = Math.min(best, len);
    }
    bestEndingBy[right] = best;
  }
  return answer === Infinity ? -1 : answer;
};

module.exports = { minSumOfLengths };
