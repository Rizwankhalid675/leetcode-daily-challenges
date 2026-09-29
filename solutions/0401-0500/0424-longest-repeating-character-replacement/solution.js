/**
 * 424. Longest Repeating Character Replacement
 * https://leetcode.com/problems/longest-repeating-character-replacement/
 * Grow a window while (length - count of its most frequent letter) <= k. The max frequency is
 * never decreased, which is safe because only a larger max can improve the answer.
 */
var characterReplacement = function (s, k) {
  const freq = new Array(26).fill(0);
  let left = 0, maxFreq = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s.charCodeAt(right) - 65;
    freq[c]++;
    if (freq[c] > maxFreq) maxFreq = freq[c];
    while (right - left + 1 - maxFreq > k) {
      freq[s.charCodeAt(left) - 65]--;
      left++;
    }
    if (right - left + 1 > best) best = right - left + 1;
  }
  return best;
};

module.exports = { characterReplacement };
