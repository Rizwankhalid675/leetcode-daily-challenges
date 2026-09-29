/**
 * 2629. Function Composition
 * https://leetcode.com/problems/function-composition/
 * Apply the functions right to left: loop from the last index down, feeding each result into the next; an empty list is the identity.
 */
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    for (let i = functions.length - 1; i >= 0; i--) x = functions[i](x);
    return x;
  };
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

module.exports = { compose };
