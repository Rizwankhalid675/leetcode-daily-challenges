/**
 * 728. Self Dividing Numbers
 * https://leetcode.com/problems/self-dividing-numbers/
 * For each number in range, check each digit: it must be nonzero and divide the number.
 */
var selfDividingNumbers = function (left, right) {
  const out = [];
  for (let x = left; x <= right; x++) {
    let y = x;
    let ok = true;
    while (y > 0) {
      const d = y % 10;
      if (d === 0 || x % d !== 0) { ok = false; break; }
      y = Math.floor(y / 10);
    }
    if (ok) out.push(x);
  }
  return out;
};

module.exports = { selfDividingNumbers };
