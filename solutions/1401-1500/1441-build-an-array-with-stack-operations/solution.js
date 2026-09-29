/**
 * 1441. Build an Array With Stack Operations
 * https://leetcode.com/problems/build-an-array-with-stack-operations/
 * Walk the stream 1..last(target): push every number, and immediately pop numbers that are not the next target value.
 */
var buildArray = function (target, n) {
  const ops = [];
  let t = 0;
  for (let x = 1; x <= n && t < target.length; x++) {
    ops.push('Push');
    if (x === target[t]) t++;
    else ops.push('Pop');
  }
  return ops;
};

module.exports = { buildArray };
