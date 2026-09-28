/**
 * 1807. Evaluate the Bracket Pairs of a String
 * https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/
 *
 * Put the knowledge into a Map for O(1) lookups, then scan once: copy plain characters,
 * and when a '(' starts, read the key up to ')' and emit its value (or '?').
 * Pieces are collected in an array and joined once at the end.
 *
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function (s, knowledge) {
  const values = new Map(knowledge);
  const out = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '(') {
      out.push(s[i]);
      continue;
    }
    const close = s.indexOf(')', i);
    const key = s.slice(i + 1, close);
    out.push(values.get(key) ?? '?');
    i = close; // loop increment moves past ')'
  }
  return out.join('');
};

module.exports = { evaluate };
