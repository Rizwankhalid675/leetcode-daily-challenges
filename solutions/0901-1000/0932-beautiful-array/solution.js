/**
 * 932. Beautiful Array
 * https://leetcode.com/problems/beautiful-array/
 * If A is beautiful then so are 2A−1 (odds) and 2A (evens), and odds followed by evens is beautiful. Build up iteratively by doubling and drop values above n.
 */
var beautifulArray = function (n) {
  let res = [1];
  while (res.length < n) {
    const next = [];
    for (const x of res) if (2 * x - 1 <= n) next.push(2 * x - 1);
    for (const x of res) if (2 * x <= n) next.push(2 * x);
    res = next;
  }
  return res;
};

module.exports = { beautifulArray };
