/**
 * 860. Lemonade Change
 * https://leetcode.com/problems/lemonade-change/
 * Track counts of $5 and $10 bills. For a $20, prefer giving $10+$5 (keeps the more flexible $5s), else three $5s.
 */
var lemonadeChange = function (bills) {
  let five = 0;
  let ten = 0;
  for (const b of bills) {
    if (b === 5) {
      five++;
    } else if (b === 10) {
      if (five === 0) return false;
      five--;
      ten++;
    } else if (ten > 0 && five > 0) {
      ten--;
      five--;
    } else if (five >= 3) {
      five -= 3;
    } else {
      return false;
    }
  }
  return true;
};

module.exports = { lemonadeChange };
