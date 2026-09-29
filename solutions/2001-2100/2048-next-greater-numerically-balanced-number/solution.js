/**
 * 2048. Next Greater Numerically Balanced Number
 * https://leetcode.com/problems/next-greater-numerically-balanced-number/
 * Scan upward from n + 1 and return the first number whose digit counts satisfy count[d] = d for every digit present. The widest gap in range (666666 -> 1224444) is about 5.6·10^5 candidates, so this is fast.
 */
var nextBeautifulNumber = function (n) {
  const cnt = new Int8Array(10);
  for (let x = n + 1; ; x++) {
    cnt.fill(0);
    for (let y = x; y > 0; y = (y / 10) | 0) cnt[y % 10]++;
    let ok = true;
    for (let d = 0; d < 10; d++) {
      if (cnt[d] !== 0 && cnt[d] !== d) { ok = false; break; }
    }
    if (ok) return x;
  }
};

module.exports = { nextBeautifulNumber };
