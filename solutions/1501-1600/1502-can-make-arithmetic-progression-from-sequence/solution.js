/**
 * 1502. Can Make Arithmetic Progression From Sequence
 * https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/
 * Sort, then every adjacent difference must equal the first one.
 */
var canMakeArithmeticProgression = function (arr) {
  const a = [...arr].sort((x, y) => x - y);
  const d = a[1] - a[0];
  for (let i = 2; i < a.length; i++) {
    if (a[i] - a[i - 1] !== d) return false;
  }
  return true;
};

module.exports = { canMakeArithmeticProgression };
