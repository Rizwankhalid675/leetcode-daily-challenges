/**
 * 1765. Map of Highest Peak
 * https://leetcode.com/problems/map-of-highest-peak/
 * Multi-source BFS from all water cells; each land cell's height is its BFS distance to the nearest water. Typed-array queue over flattened indices for 10⁶ cells.
 */
var highestPeak = function (isWater) {
  const m = isWater.length, n = isWater[0].length, total = m * n;
  const h = new Int32Array(total).fill(-1);
  const queue = new Int32Array(total);
  let head = 0, tail = 0;
  for (let i = 0; i < m; i++) {
    const row = isWater[i];
    for (let j = 0; j < n; j++) {
      if (row[j] === 1) {
        h[i * n + j] = 0;
        queue[tail++] = i * n + j;
      }
    }
  }
  while (head < tail) {
    const cur = queue[head++];
    const r = (cur / n) | 0, c = cur - r * n, nh = h[cur] + 1;
    if (r > 0 && h[cur - n] === -1) { h[cur - n] = nh; queue[tail++] = cur - n; }
    if (r + 1 < m && h[cur + n] === -1) { h[cur + n] = nh; queue[tail++] = cur + n; }
    if (c > 0 && h[cur - 1] === -1) { h[cur - 1] = nh; queue[tail++] = cur - 1; }
    if (c + 1 < n && h[cur + 1] === -1) { h[cur + 1] = nh; queue[tail++] = cur + 1; }
  }
  const res = new Array(m);
  for (let i = 0; i < m; i++) res[i] = Array.from(h.subarray(i * n, i * n + n));
  return res;
};

module.exports = { highestPeak };
