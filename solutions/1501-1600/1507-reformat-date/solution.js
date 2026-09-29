/**
 * 1507. Reformat Date
 * https://leetcode.com/problems/reformat-date/
 * Split into day/month/year, strip the ordinal suffix, map the month name to its number, zero-pad.
 */
var reformatDate = function (date) {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [day, month, year] = date.split(' ');
  const dd = String(parseInt(day, 10)).padStart(2, '0');
  const mm = String(MONTHS.indexOf(month) + 1).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

module.exports = { reformatDate };
