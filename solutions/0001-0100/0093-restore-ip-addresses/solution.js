/**
 * 93. Restore IP Addresses
 * https://leetcode.com/problems/restore-ip-addresses/
 * Backtrack over four segments of 1-3 digits each, rejecting leading zeros and values over 255,
 * and pruning when the remaining length cannot fit the remaining segments.
 */
var restoreIpAddresses = function (s) {
  const out = [];
  const parts = [];
  const dfs = (pos) => {
    const left = 4 - parts.length;
    const rem = s.length - pos;
    if (left === 0) {
      if (rem === 0) out.push(parts.join('.'));
      return;
    }
    if (rem < left || rem > 3 * left) return;
    for (let len = 1; len <= 3 && pos + len <= s.length; len++) {
      const seg = s.slice(pos, pos + len);
      if (len > 1 && seg[0] === '0') break;
      if (Number(seg) > 255) break;
      parts.push(seg);
      dfs(pos + len);
      parts.pop();
    }
  };
  dfs(0);
  return out;
};

module.exports = { restoreIpAddresses };
