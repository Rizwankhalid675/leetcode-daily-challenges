/**
 * 394. Decode String
 * https://leetcode.com/problems/decode-string/
 *
 * Stack of frames. On '[' push (text built so far, repeat count) and start a fresh piece;
 * on ']' pop and append the piece repeated. Digits accumulate multi-digit counts.
 *
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];
  let current = '';
  let count = 0;
  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      count = count * 10 + Number(ch);
    } else if (ch === '[') {
      stack.push([current, count]);
      current = '';
      count = 0;
    } else if (ch === ']') {
      const [before, times] = stack.pop();
      current = before + current.repeat(times);
    } else {
      current += ch;
    }
  }
  return current;
};

module.exports = { decodeString };
