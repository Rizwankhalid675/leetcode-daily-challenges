/**
 * 67. Add Binary
 * https://leetcode.com/problems/add-binary/
 * Schoolbook addition from the right with a carry, one digit at a time. Strings can be 10^4 long,
 * so no conversion to Number is used.
 */
var addBinary = function (a, b) {
  const out = [];
  let i = a.length - 1, j = b.length - 1, carry = 0;
  while (i >= 0 || j >= 0 || carry) {
    let s = carry;
    if (i >= 0) s += a.charCodeAt(i--) - 48;
    if (j >= 0) s += b.charCodeAt(j--) - 48;
    out.push(s & 1);
    carry = s >> 1;
  }
  return out.reverse().join('');
};

module.exports = { addBinary };
