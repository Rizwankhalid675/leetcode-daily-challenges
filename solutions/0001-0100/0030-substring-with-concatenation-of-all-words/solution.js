/**
 * 30. Substring with Concatenation of All Words
 * https://leetcode.com/problems/substring-with-concatenation-of-all-words/
 *
 * All words have length L. For each offset 0..L-1, slide a window over s one WORD at a time
 * (so every candidate start with that offset is covered), keeping counts of words in the
 * window. Shrink from the left when a word is over-used; reset on an unknown word.
 * A full window (all words used exactly) records its start.
 *
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const L = words[0].length;
  const k = words.length;
  const need = new Map();
  for (const w of words) need.set(w, (need.get(w) ?? 0) + 1);
  const result = [];

  for (let offset = 0; offset < L; offset++) {
    const have = new Map();
    let left = offset;
    let used = 0;
    for (let right = offset; right + L <= s.length; right += L) {
      const word = s.slice(right, right + L);
      if (!need.has(word)) {
        have.clear();
        used = 0;
        left = right + L;
        continue;
      }
      have.set(word, (have.get(word) ?? 0) + 1);
      used++;
      while (have.get(word) > need.get(word)) {
        const drop = s.slice(left, left + L);
        have.set(drop, have.get(drop) - 1);
        used--;
        left += L;
      }
      if (used === k) {
        result.push(left);
        const drop = s.slice(left, left + L); // slide forward by one word
        have.set(drop, have.get(drop) - 1);
        used--;
        left += L;
      }
    }
  }
  return result;
};

module.exports = { findSubstring };
