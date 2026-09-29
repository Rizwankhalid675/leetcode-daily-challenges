/**
 * 636. Exclusive Time of Functions
 * https://leetcode.com/problems/exclusive-time-of-functions/
 * Call stack of function ids plus a 'time cursor' (start of the unaccounted interval). Each log event credits the elapsed time to the function on top.
 */
var exclusiveTime = function (n, logs) {
  const res = new Array(n).fill(0);
  const stack = [];
  let prev = 0; // first time unit not yet credited to anyone
  for (const log of logs) {
    const [idStr, type, timeStr] = log.split(':');
    const id = Number(idStr);
    const time = Number(timeStr);
    if (type === 'start') {
      if (stack.length) res[stack[stack.length - 1]] += time - prev;
      stack.push(id);
      prev = time;
    } else {
      res[stack.pop()] += time - prev + 1; // 'end' is inclusive of its time unit
      prev = time + 1;
    }
  }
  return res;
};

module.exports = { exclusiveTime };
