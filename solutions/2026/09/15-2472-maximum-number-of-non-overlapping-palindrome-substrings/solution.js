/**
 * 2472. Maximum Number of Non-overlapping Palindrome Substrings
 * https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/
 *
 * Key observation: if a palindrome of length >= k is selected, removing one character from
 * each end keeps it a palindrome and keeps it inside the same span. So we can always shrink
 * a chosen palindrome to length k or k + 1 without breaking anything. Therefore only
 * palindromes of length exactly k or k + 1 ever need to be considered.
 *
 * dp[i] = max number of palindromes selectable within s[0..i).
 * dp[i] = max(dp[i-1], dp[i-k] + 1 if s[i-k..i) is a palindrome,
 *                     dp[i-k-1] + 1 if s[i-k-1..i) is a palindrome)
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function (s, k) {
  const n = s.length;
  const isPalindrome = (lo, hi) => {
    // checks s[lo..hi)
    for (hi--; lo < hi; lo++, hi--) if (s[lo] !== s[hi]) return false;
    return true;
  };

  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1];
    if (i >= k && isPalindrome(i - k, i)) dp[i] = Math.max(dp[i], dp[i - k] + 1);
    if (i >= k + 1 && isPalindrome(i - k - 1, i)) dp[i] = Math.max(dp[i], dp[i - k - 1] + 1);
  }
  return dp[n];
};

module.exports = { maxPalindromes };
