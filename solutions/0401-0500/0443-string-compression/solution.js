/**
 * 443. String Compression
 * https://leetcode.com/problems/string-compression/
 *
 * Read pointer scans groups of equal characters; write pointer overwrites the array in
 * place with the character and (if the group is longer than 1) the digits of its length.
 * The write pointer never overtakes the read pointer, because a group of length L >= 2
 * is written as 1 + digits(L) <= L characters.
 *
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  let write = 0;
  let read = 0;
  while (read < chars.length) {
    const ch = chars[read];
    let groupEnd = read;
    while (groupEnd < chars.length && chars[groupEnd] === ch) groupEnd++;
    const length = groupEnd - read;
    chars[write++] = ch;
    if (length > 1) {
      for (const digit of String(length)) chars[write++] = digit;
    }
    read = groupEnd;
  }
  return write;
};

module.exports = { compress };
