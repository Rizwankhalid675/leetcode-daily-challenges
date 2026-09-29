/**
 * 481. Magical String
 * https://leetcode.com/problems/magical-string/
 * Build the self-describing string with a read pointer (which group length to use next) and a
 * write pointer (where to append), counting ones among the first n characters.
 */
var magicalString = function (n) {
  if (n <= 3) return 1;
  const s = new Uint8Array(n + 2);
  s[0] = 1; s[1] = 2; s[2] = 2;
  let read = 2, write = 3, next = 1, ones = 1;
  while (write < n) {
    for (let c = 0; c < s[read] && write < n; c++) {
      s[write++] = next;
      if (next === 1) ones++;
    }
    next = 3 - next;
    read++;
  }
  return ones;
};

module.exports = { magicalString };
