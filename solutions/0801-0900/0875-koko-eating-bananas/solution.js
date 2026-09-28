/**
 * 875. Koko Eating Bananas
 * https://leetcode.com/problems/koko-eating-bananas/
 *
 * Binary search on the answer: hours needed at speed k is sum(ceil(pile / k)), which only
 * decreases as k grows. Find the smallest k in [1, max(pile)] with hours(k) <= h.
 *
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let lo = 1;
  let hi = 0;
  for (const p of piles) if (p > hi) hi = p;
  const hoursAt = (k) => {
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / k);
    return hours;
  };
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};

module.exports = { minEatingSpeed };
