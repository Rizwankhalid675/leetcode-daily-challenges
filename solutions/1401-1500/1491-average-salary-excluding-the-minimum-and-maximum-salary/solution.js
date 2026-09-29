/**
 * 1491. Average Salary Excluding the Minimum and Maximum Salary
 * https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/
 * One pass for sum, min and max; average the rest as (sum − min − max) / (n − 2).
 */
var average = function (salary) {
  let sum = 0, mn = Infinity, mx = -Infinity;
  for (const x of salary) {
    sum += x;
    if (x < mn) mn = x;
    if (x > mx) mx = x;
  }
  return (sum - mn - mx) / (salary.length - 2);
};

module.exports = { average };
