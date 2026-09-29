/**
 * 2140. Solving Questions With Brainpower
 * https://leetcode.com/problems/solving-questions-with-brainpower/
 * Suffix DP: best[i] = max(skip i -> best[i+1], solve i -> points + best[i + brainpower + 1]).
 */
var mostPoints = function (questions) {
  const n = questions.length;
  const best = new Float64Array(n + 1);
  for (let i = n - 1; i >= 0; i--) {
    const [points, power] = questions[i];
    const next = i + power + 1;
    const solve = points + (next < n ? best[next] : 0);
    best[i] = solve > best[i + 1] ? solve : best[i + 1];
  }
  return best[0];
};

module.exports = { mostPoints };
