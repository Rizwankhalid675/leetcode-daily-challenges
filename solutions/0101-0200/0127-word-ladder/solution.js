/**
 * 127. Word Ladder
 * https://leetcode.com/problems/word-ladder/
 * BFS from beginWord over the word set. Neighbours are found by changing each letter to a-z,
 * and words are deleted from the set on first visit. Returns the number of words in the shortest ladder, or 0.
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  dict.delete(beginWord);
  let frontier = [beginWord];
  let steps = 1;
  while (frontier.length) {
    steps++;
    const next = [];
    for (const word of frontier) {
      const chars = word.split('');
      for (let i = 0; i < chars.length; i++) {
        const orig = chars[i];
        for (let c = 97; c <= 122; c++) {
          const ch = String.fromCharCode(c);
          if (ch === orig) continue;
          chars[i] = ch;
          const cand = chars.join('');
          if (dict.has(cand)) {
            if (cand === endWord) return steps;
            dict.delete(cand);
            next.push(cand);
          }
        }
        chars[i] = orig;
      }
    }
    frontier = next;
  }
  return 0;
};

module.exports = { ladderLength };
