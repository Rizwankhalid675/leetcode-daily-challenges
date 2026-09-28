/**
 * 2390. Removing Stars From a String
 * https://leetcode.com/problems/removing-stars-from-a-string/
 *
 * Stack of kept characters: a letter is pushed, a star pops the nearest kept letter
 * to its left (the top of the stack).
 *
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
  const stack = [];
  for (const ch of s) {
    if (ch === '*') stack.pop();
    else stack.push(ch);
  }
  return stack.join('');
};

module.exports = { removeStars };
