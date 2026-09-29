/**
 * 858. Mirror Reflection
 * https://leetcode.com/problems/mirror-reflection/
 * Unfold the mirrors: the ray hits a corner after rising lcm(p, q). Divide out common factors of 2; the parities of p and q then pick receptor 0, 1 or 2.
 */
var mirrorReflection = function (p, q) {
  while (p % 2 === 0 && q % 2 === 0) {
    p /= 2;
    q /= 2;
  }
  if (p % 2 === 0) return 2;
  if (q % 2 === 0) return 0;
  return 1;
};

module.exports = { mirrorReflection };
