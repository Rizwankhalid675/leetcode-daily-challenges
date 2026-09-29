/**
 * 211. Design Add and Search Words Data Structure
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/
 * Trie of added words. search walks the trie; a '.' branches into every child (at most 2 dots per
 * query, words up to 25 letters, so the recursion is shallow).
 */
var WordDictionary = function () {
  this.root = { end: false, next: {} };
};

WordDictionary.prototype.addWord = function (word) {
  let node = this.root;
  for (const ch of word) node = node.next[ch] || (node.next[ch] = { end: false, next: {} });
  node.end = true;
};

WordDictionary.prototype.search = function (word) {
  const dfs = (node, i) => {
    if (i === word.length) return node.end;
    const ch = word[i];
    if (ch !== '.') {
      const child = node.next[ch];
      return child !== undefined && dfs(child, i + 1);
    }
    for (const key in node.next) if (dfs(node.next[key], i + 1)) return true;
    return false;
  };
  return dfs(this.root, 0);
};

module.exports = { WordDictionary };
