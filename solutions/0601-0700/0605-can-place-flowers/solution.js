/**
 * 605. Can Place Flowers
 * https://leetcode.com/problems/can-place-flowers/
 *
 * Greedy left to right: plant in any empty plot whose neighbours (treating the ends as
 * empty) are both empty. Planting as early as possible never blocks more plots than
 * planting later would, so the greedy count is the maximum.
 *
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let planted = 0;
  const bed = [...flowerbed]; // don't mutate the caller's array
  for (let i = 0; i < bed.length && planted < n; i++) {
    const leftEmpty = i === 0 || bed[i - 1] === 0;
    const rightEmpty = i === bed.length - 1 || bed[i + 1] === 0;
    if (bed[i] === 0 && leftEmpty && rightEmpty) {
      bed[i] = 1;
      planted++;
    }
  }
  return planted >= n;
};

module.exports = { canPlaceFlowers };
