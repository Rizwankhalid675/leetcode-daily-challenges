/**
 * 1482. Minimum Number of Days to Make m Bouquets
 * https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/
 * Binary search on the day: feasibility (at least m runs of k adjacent bloomed flowers) is monotone in the day. Reject upfront when m·k > n.
 */
var minDays = function (bloomDay, m, k) {
  const n = bloomDay.length;
  if (m * k > n) return -1;
  const canMake = (day) => {
    let made = 0;
    let run = 0;
    for (let i = 0; i < n; i++) {
      if (bloomDay[i] <= day) {
        if (++run === k) {
          made++;
          run = 0;
          if (made >= m) return true;
        }
      } else {
        run = 0;
      }
    }
    return false;
  };
  let lo = Infinity;
  let hi = -Infinity;
  for (const d of bloomDay) {
    if (d < lo) lo = d;
    if (d > hi) hi = d;
  }
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (canMake(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};

module.exports = { minDays };
