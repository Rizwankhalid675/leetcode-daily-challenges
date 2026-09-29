/**
 * 1590. Make Sum Divisible by P
 * https://leetcode.com/problems/make-sum-divisible-by-p/
 * Let need = total mod p. Scan prefix sums mod p, remembering the last index of each remainder; a subarray ending at i with sum ≡ need starts right after the last prefix equal to (cur − need) mod p.
 */
var minSubarray = function (nums, p) {
  let need = 0;
  for (const x of nums) need = (need + x) % p;
  if (need === 0) return 0;
  const last = new Map([[0, -1]]);
  let cur = 0;
  let best = nums.length;
  for (let i = 0; i < nums.length; i++) {
    cur = (cur + nums[i]) % p;
    const want = (cur - need + p) % p;
    if (last.has(want)) best = Math.min(best, i - last.get(want));
    last.set(cur, i);
  }
  return best === nums.length ? -1 : best;
};

module.exports = { minSubarray };
