/**
 * 720. Longest Word in Dictionary
 * https://leetcode.com/problems/longest-word-in-dictionary/
 * Insert all words into a trie, then walk only through nodes that end a word; the deepest reachable word wins, ties broken by lexicographic order.
 */
var longestWord = function (words) {
  const children = [new Array(26).fill(0)];
  const wordAt = [-1];
  for (let w = 0; w < words.length; w++) {
    let node = 0;
    for (const ch of words[w]) {
      const c = ch.charCodeAt(0) - 97;
      if (children[node][c] === 0) {
        children[node][c] = children.length;
        children.push(new Array(26).fill(0));
        wordAt.push(-1);
      }
      node = children[node][c];
    }
    wordAt[node] = w;
  }
  let best = '';
  const stack = [0];
  while (stack.length) {
    const node = stack.pop();
    if (node !== 0) {
      const word = words[wordAt[node]];
      if (word.length > best.length || (word.length === best.length && word < best)) best = word;
    }
    for (let c = 0; c < 26; c++) {
      const next = children[node][c];
      if (next !== 0 && wordAt[next] !== -1) stack.push(next);
    }
  }
  return best;
};

module.exports = { longestWord };
