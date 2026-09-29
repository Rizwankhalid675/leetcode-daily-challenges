/**
 * 214. Shortest Palindrome
 * https://leetcode.com/problems/shortest-palindrome/
 * The longest palindromic prefix of s equals the longest border of s + "#" + reverse(s) (KMP prefix
 * function). Prepend the reverse of the remaining suffix.
 */
var shortestPalindrome = function (s) {
  const rev = s.split('').reverse().join('');
  const t = s + '#' + rev;
  const pi = new Int32Array(t.length);
  for (let i = 1; i < t.length; i++) {
    let j = pi[i - 1];
    while (j > 0 && t[i] !== t[j]) j = pi[j - 1];
    if (t[i] === t[j]) j++;
    pi[i] = j;
  }
  const palPrefix = pi[t.length - 1];
  return rev.slice(0, s.length - palPrefix) + s;
};

module.exports = { shortestPalindrome };
