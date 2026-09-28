/**
 * 3483. Unique 3-Digit Even Numbers
 * https://leetcode.com/problems/unique-3-digit-even-numbers/
 *
 * Enumerate the answer space instead of the choices: there are only 450 even numbers
 * from 100 to 998. Keep each one whose digits can be taken from the available multiset.
 * Distinctness comes for free because each candidate number is checked once.
 *
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function (digits) {
  const available = new Array(10).fill(0);
  for (const d of digits) available[d]++;

  let count = 0;
  for (let x = 100; x <= 998; x += 2) {
    const need = new Array(10).fill(0);
    need[Math.floor(x / 100)]++;
    need[Math.floor(x / 10) % 10]++;
    need[x % 10]++;
    if (need.every((k, d) => k <= available[d])) count++;
  }
  return count;
};

module.exports = { totalNumbers };
