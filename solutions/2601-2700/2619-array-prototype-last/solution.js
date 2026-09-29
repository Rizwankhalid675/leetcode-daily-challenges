/**
 * 2619. Array Prototype Last
 * https://leetcode.com/problems/array-prototype-last/
 * Extend Array.prototype: return this[this.length - 1], or -1 when the array is empty.
 */
/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function () {
  return this.length === 0 ? -1 : this[this.length - 1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */

module.exports = { Array };
