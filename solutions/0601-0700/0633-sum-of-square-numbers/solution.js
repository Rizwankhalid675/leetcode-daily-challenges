/**
 * 633. Sum of Square Numbers
 * https://leetcode.com/problems/sum-of-square-numbers/
 * Two pointers a = 0 and b = floor(sqrt(c)); move a up when a² + b² is too small and b down when too large. All values stay below 2^33, well inside exact double range.
 */
var judgeSquareSum = function (c) {
  let a = 0;
  let b = Math.floor(Math.sqrt(c));
  while (a <= b) {
    const s = a * a + b * b;
    if (s === c) return true;
    if (s < c) a++;
    else b--;
  }
  return false;
};

module.exports = { judgeSquareSum };
