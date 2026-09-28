/**
 * 17. Letter Combinations of a Phone Number
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 *
 * Backtracking over digit positions: at each position append each possible letter,
 * recurse, then remove it. At most 4^4 = 256 combinations.
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) return [];
  const KEYS = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
  const result = [];
  const path = [];
  const backtrack = (i) => {
    if (i === digits.length) {
      result.push(path.join(''));
      return;
    }
    for (const letter of KEYS[digits[i]]) {
      path.push(letter);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return result;
};

module.exports = { letterCombinations };
