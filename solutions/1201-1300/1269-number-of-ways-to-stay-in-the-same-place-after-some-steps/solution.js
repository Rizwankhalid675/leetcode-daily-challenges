/**
 * 1269. Number of Ways to Stay in the Same Place After Some Steps
 * https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/
 * DP over positions, one step at a time (stay / left / right), modulo 1e9+7. Positions beyond min(arrLen, steps/2 + 1) can never return to 0, so the row width is capped at about 251.
 */
var numWays = function (steps, arrLen) {
  const MOD = 1e9 + 7;
  const W = Math.min(arrLen, (steps >> 1) + 1);
  let cur = new Float64Array(W);
  let nxt = new Float64Array(W);
  cur[0] = 1;
  for (let s = 0; s < steps; s++) {
    for (let i = 0; i < W; i++) {
      let v = cur[i];
      if (i > 0) v += cur[i - 1];
      if (i + 1 < W) v += cur[i + 1];
      nxt[i] = v % MOD;
    }
    [cur, nxt] = [nxt, cur];
  }
  return cur[0];
};

module.exports = { numWays };
