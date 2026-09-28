/**
 * 1732. Find the Highest Altitude
 * https://leetcode.com/problems/find-the-highest-altitude/
 *
 * Altitudes are the prefix sums of the gains (starting from 0); return the largest one.
 *
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let altitude = 0;
  let highest = 0; // the starting point counts
  for (const g of gain) {
    altitude += g;
    if (altitude > highest) highest = altitude;
  }
  return highest;
};

module.exports = { largestAltitude };
