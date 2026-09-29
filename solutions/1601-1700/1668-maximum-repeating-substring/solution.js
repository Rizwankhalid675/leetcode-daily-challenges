/**
 * 1668. Maximum Repeating Substring
 * https://leetcode.com/problems/maximum-repeating-substring/
 * Grow k while word repeated k+1 times is still a substring of sequence.
 */
var maxRepeating = function (sequence, word) {
  let k = 0;
  while (sequence.includes(word.repeat(k + 1))) k++;
  return k;
};

module.exports = { maxRepeating };
