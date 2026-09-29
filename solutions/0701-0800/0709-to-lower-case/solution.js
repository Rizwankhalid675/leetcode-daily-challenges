/**
 * 709. To Lower Case
 * https://leetcode.com/problems/to-lower-case/
 * Shift only the codes 65–90 (A–Z) by +32; every other printable ASCII character is copied unchanged.
 */
var toLowerCase = function (s) {
  const out = new Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out[i] = c >= 65 && c <= 90 ? String.fromCharCode(c + 32) : s[i];
  }
  return out.join('');
};

module.exports = { toLowerCase };
