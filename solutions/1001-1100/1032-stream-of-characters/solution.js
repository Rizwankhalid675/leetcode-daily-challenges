/**
 * 1032. Stream of Characters
 * https://leetcode.com/problems/stream-of-characters/
 * Build a trie of the reversed words. For each new letter, walk the stream backwards from the newest letter (at most max-word-length steps) and stop at the first word end.
 */
var StreamChecker = function (words) {
  let total = 1;
  this.maxLen = 0;
  for (const w of words) {
    total += w.length;
    if (w.length > this.maxLen) this.maxLen = w.length;
  }
  this.next = new Int32Array(total * 26); // 0 = no child (the root is never a child)
  this.end = new Uint8Array(total);
  let count = 1;
  for (const w of words) {
    let node = 0;
    for (let i = w.length - 1; i >= 0; i--) {
      const slot = node * 26 + w.charCodeAt(i) - 97;
      if (this.next[slot] === 0) this.next[slot] = count++;
      node = this.next[slot];
    }
    this.end[node] = 1;
  }
  this.stream = [];
};
StreamChecker.prototype.query = function (letter) {
  const s = this.stream;
  s.push(letter.charCodeAt(0) - 97);
  const stop = Math.max(0, s.length - this.maxLen);
  let node = 0;
  for (let i = s.length - 1; i >= stop; i--) {
    node = this.next[node * 26 + s[i]];
    if (node === 0) return false;
    if (this.end[node] === 1) return true;
  }
  return false;
};

module.exports = { StreamChecker };
