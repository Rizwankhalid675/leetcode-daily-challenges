/**
 * 761. Special Binary String
 * https://leetcode.com/problems/special-binary-string/
 * Split s into top-level special blocks "1" + inner + "0", recursively maximise each inner part, then sort the blocks in descending order (compare by a+b vs b+a) and join.
 */
var makeLargestSpecial = function (s) {
  const parts = [];
  let bal = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    bal += s[i] === '1' ? 1 : -1;
    if (bal === 0) {
      parts.push('1' + makeLargestSpecial(s.slice(start + 1, i)) + '0');
      start = i + 1;
    }
  }
  parts.sort((a, b) => (a + b > b + a ? -1 : a + b < b + a ? 1 : 0));
  return parts.join('');
};

module.exports = { makeLargestSpecial };
