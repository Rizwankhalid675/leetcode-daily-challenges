/**
 * 1365. How Many Numbers Are Smaller Than the Current Number
 * https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
 * Values are 0..100: prefix counts of a frequency array give 'how many are smaller' in O(1) each.
 */
var smallerNumbersThanCurrent = function (nums) {
  const count = new Array(102).fill(0);
  for (const x of nums) count[x + 1]++;
  for (let v = 1; v < 102; v++) count[v] += count[v - 1]; // count[v] = # of values < v
  return nums.map((x) => count[x]);
};

module.exports = { smallerNumbersThanCurrent };
