/**
 * 43. Multiply Strings
 * https://leetcode.com/problems/multiply-strings/
 * Grade-school multiplication into a digit array: digit i × digit j adds into position i + j + 1 with carries, then strip leading zeros.
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';
  const m = num1.length, n = num2.length;
  const res = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    const a = num1.charCodeAt(i) - 48;
    for (let j = n - 1; j >= 0; j--) {
      const sum = a * (num2.charCodeAt(j) - 48) + res[i + j + 1];
      res[i + j + 1] = sum % 10;
      res[i + j] += Math.floor(sum / 10);
    }
  }
  let k = 0;
  while (k < res.length - 1 && res[k] === 0) k++;
  return res.slice(k).join('');
};

module.exports = { multiply };
