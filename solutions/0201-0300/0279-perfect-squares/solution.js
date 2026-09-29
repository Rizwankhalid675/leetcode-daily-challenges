/**
 * 279. Perfect Squares
 * https://leetcode.com/problems/perfect-squares/
 * Number theory: the answer is 1 for squares, 4 exactly when n = 4^a(8b + 7) (Legendre), 2 if n is a sum of two squares, else 3.
 */
var numSquares = function (n) {
  const isSq = (x) => {
    const r = Math.floor(Math.sqrt(x));
    return r * r === x;
  };
  if (isSq(n)) return 1;
  let m = n;
  while (m % 4 === 0) m /= 4;
  if (m % 8 === 7) return 4;
  for (let a = 1; a * a <= n; a++) if (isSq(n - a * a)) return 2;
  return 3;
};

module.exports = { numSquares };
