/**
 * 1392. Longest Happy Prefix
 * https://leetcode.com/problems/longest-happy-prefix/
 * The longest happy prefix is the longest proper border, which is the last value of the KMP
 * prefix function.
 */
var longestPrefix = function (s) {
  const n = s.length;
  const pi = new Int32Array(n);
  for (let i = 1; i < n; i++) {
    let j = pi[i - 1];
    while (j > 0 && s.charCodeAt(i) !== s.charCodeAt(j)) j = pi[j - 1];
    if (s.charCodeAt(i) === s.charCodeAt(j)) j++;
    pi[i] = j;
  }
  return s.slice(0, pi[n - 1]);
};

module.exports = { longestPrefix };
