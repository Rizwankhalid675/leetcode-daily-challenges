/**
 * 520. Detect Capital
 * https://leetcode.com/problems/detect-capital/
 * Valid iff all upper, all lower, or only the first letter upper.
 */
var detectCapitalUse = function (word) {
  return word === word.toUpperCase() || word === word.toLowerCase() || word.slice(1) === word.slice(1).toLowerCase();
};

module.exports = { detectCapitalUse };
