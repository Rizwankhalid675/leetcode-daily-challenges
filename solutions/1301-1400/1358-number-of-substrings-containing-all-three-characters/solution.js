/**
 * 1358. Number of Substrings Containing All Three Characters
 * https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
 * For each right end, every start at or before the smallest "last seen" index of a/b/c gives a
 * valid substring, so add min(last) + 1.
 */
var numberOfSubstrings = function (s) {
  const last = [-1, -1, -1];
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - 97] = i;
    count += Math.min(last[0], last[1], last[2]) + 1;
  }
  return count;
};

module.exports = { numberOfSubstrings };
