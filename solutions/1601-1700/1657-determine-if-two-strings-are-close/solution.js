/**
 * 1657. Determine if Two Strings Are Close
 * https://leetcode.com/problems/determine-if-two-strings-are-close/
 *
 * Operation 1 (swap positions) means order is irrelevant: only letter counts matter.
 * Operation 2 (swap two letters' roles) permutes which letter owns which count, but can
 * never introduce a letter that isn't present. So the strings are close iff
 *   (a) they use exactly the same set of letters, and
 *   (b) their multisets of counts are equal.
 *
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;
  const count = (w) => {
    const c = new Array(26).fill(0);
    for (let i = 0; i < w.length; i++) c[w.charCodeAt(i) - 97]++;
    return c;
  };
  const a = count(word1);
  const b = count(word2);
  for (let i = 0; i < 26; i++) {
    if ((a[i] === 0) !== (b[i] === 0)) return false; // same set of letters
  }
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, i) => v === sb[i]); // same multiset of counts
};

module.exports = { closeStrings };
