/**
 * 2705. Compact Object
 * https://leetcode.com/problems/compact-object/
 * Recursively rebuild arrays/objects keeping only truthy values (each kept value compacted in turn); primitives are returned as is.
 */
/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    const res = [];
    for (const v of obj) if (v) res.push(compactObject(v));
    return res;
  }
  const res = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v) res[k] = compactObject(v);
  }
  return res;
};

module.exports = { compactObject };
