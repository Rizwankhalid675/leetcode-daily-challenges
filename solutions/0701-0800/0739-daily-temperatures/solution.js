/**
 * 739. Daily Temperatures
 * https://leetcode.com/problems/daily-temperatures/
 *
 * Monotonic stack of indices whose warmer day hasn't been found yet (temperatures on the
 * stack are non-increasing from bottom to top). A new warmer day resolves every colder
 * index on top of the stack.
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];
  temperatures.forEach((t, i) => {
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < t) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  });
  return answer;
};

module.exports = { dailyTemperatures };
