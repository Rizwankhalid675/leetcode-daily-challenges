/**
 * 205. Isomorphic Strings
 * https://leetcode.com/problems/isomorphic-strings/
 *
 * A consistent character mapping must be a bijection: track s->t and t->s and reject any
 * position that contradicts either direction.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const forward = new Map();
  const backward = new Map();
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    const b = t[i];
    if ((forward.has(a) && forward.get(a) !== b) || (backward.has(b) && backward.get(b) !== a)) return false;
    forward.set(a, b);
    backward.set(b, a);
  }
  return true;
};

module.exports = { isIsomorphic };
