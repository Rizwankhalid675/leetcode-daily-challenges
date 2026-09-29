/**
 * 149. Max Points on a Line
 * https://leetcode.com/problems/max-points-on-a-line/
 * For each anchor point, group the later points by gcd-reduced direction (sign-normalised) in a Map; the biggest group plus the anchor is a candidate.
 */
var maxPoints = function (points) {
  const n = points.length;
  if (n <= 2) return n;
  const gcd = (a, b) => {
    while (b) [a, b] = [b, a % b];
    return a;
  };
  let best = 1;
  for (let i = 0; i < n; i++) {
    const counts = new Map();
    let localBest = 0;
    for (let j = i + 1; j < n; j++) {
      let dx = points[j][0] - points[i][0];
      let dy = points[j][1] - points[i][1];
      const g = gcd(Math.abs(dx), Math.abs(dy));
      dx /= g;
      dy /= g;
      if (dx < 0 || (dx === 0 && dy < 0)) {
        dx = -dx;
        dy = -dy;
      }
      const key = dx * 100000 + dy; // |dy| <= 20000, so keys are unique
      const c = (counts.get(key) || 0) + 1;
      counts.set(key, c);
      if (c > localBest) localBest = c;
    }
    if (localBest + 1 > best) best = localBest + 1;
  }
  return best;
};

module.exports = { maxPoints };
