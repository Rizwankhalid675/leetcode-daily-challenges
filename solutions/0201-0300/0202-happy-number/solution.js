/**
 * 202. Happy Number
 * https://leetcode.com/problems/happy-number/
 *
 * The digit-square-sum sequence always falls below a small bound and then must cycle.
 * Floyd's tortoise and hare detects the cycle in O(1) memory; happy iff it reaches 1.
 *
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  const next = (x) => {
    let sum = 0;
    for (; x > 0; x = Math.floor(x / 10)) sum += (x % 10) ** 2;
    return sum;
  };
  let slow = n;
  let fast = next(n);
  while (fast !== 1 && slow !== fast) {
    slow = next(slow);
    fast = next(next(fast));
  }
  return fast === 1;
};

module.exports = { isHappy };
