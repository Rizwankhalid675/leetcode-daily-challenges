/**
 * 290. Word Pattern
 * https://leetcode.com/problems/word-pattern/
 *
 * Same bijection check as isomorphic strings, but between pattern letters and words.
 * Different counts of letters and words can never match.
 *
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(' ');
  if (words.length !== pattern.length) return false;
  const letterToWord = new Map();
  const wordToLetter = new Map();
  for (let i = 0; i < words.length; i++) {
    const p = pattern[i];
    const w = words[i];
    if ((letterToWord.has(p) && letterToWord.get(p) !== w) || (wordToLetter.has(w) && wordToLetter.get(w) !== p)) return false;
    letterToWord.set(p, w);
    wordToLetter.set(w, p);
  }
  return true;
};

module.exports = { wordPattern };
