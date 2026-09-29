/**
 * 686. Repeated String Match
 * https://leetcode.com/problems/repeated-string-match/
 * Repeat a until it is at least as long as b; b can only appear in that string or with one extra copy of a (to cover a start near the end of a copy).
 */
var repeatedStringMatch = function (a, b) {
  let times = Math.ceil(b.length / a.length);
  let s = a.repeat(times);
  if (s.includes(b)) return times;
  if ((s + a).includes(b)) return times + 1;
  return -1;
};

module.exports = { repeatedStringMatch };
