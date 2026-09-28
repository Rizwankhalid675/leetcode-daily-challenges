/**
 * 1431. Kids With the Greatest Number of Candies
 * https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/
 *
 * Giving kid i all the extra candies only changes kid i, so the comparison is against the
 * current maximum of everyone: candies[i] + extra >= max.
 *
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const max = Math.max(...candies);
  return candies.map((c) => c + extraCandies >= max);
};

module.exports = { kidsWithCandies };
