/**
 * 208. Implement Trie (Prefix Tree)
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 *
 * Each node maps a character to a child node and marks whether a word ends there.
 * insert/search/startsWith all walk one node per character.
 */
var Trie = function () {
  this.root = { children: new Map(), isWord: false };
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.root;
  for (const ch of word) {
    if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), isWord: false });
    node = node.children.get(ch);
  }
  node.isWord = true;
};

/** Walks the trie along `s`; returns the final node or null. */
Trie.prototype._walk = function (s) {
  let node = this.root;
  for (const ch of s) {
    node = node.children.get(ch);
    if (!node) return null;
  }
  return node;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const node = this._walk(word);
  return node !== null && node.isWord;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  return this._walk(prefix) !== null;
};

module.exports = { Trie };
