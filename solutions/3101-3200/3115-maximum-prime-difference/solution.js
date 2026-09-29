/**
 * 3115. Maximum Prime Difference
 * https://leetcode.com/problems/maximum-prime-difference/
 * Values are at most 100, so precompute primality with a small sieve; the answer is the index of the last prime minus the index of the first prime.
 */
var maximumPrimeDifference = function (nums) {
  const isPrime = new Array(101).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let p = 2; p * p <= 100; p++) {
    if (isPrime[p]) for (let q = p * p; q <= 100; q += p) isPrime[q] = false;
  }
  let first = 0;
  while (!isPrime[nums[first]]) first++;
  let last = nums.length - 1;
  while (!isPrime[nums[last]]) last--;
  return last - first;
};

module.exports = { maximumPrimeDifference };
