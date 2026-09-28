/**
 * 155. Min Stack
 * https://leetcode.com/problems/min-stack/
 *
 * Each entry stores its value and the minimum of the stack up to and including it, so
 * getMin is just the top entry's stored minimum. All operations O(1).
 */
var MinStack = function () {
  this.values = [];
  this.mins = [];
};

/**
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function (value) {
  const currentMin = this.mins.length ? this.mins[this.mins.length - 1] : Infinity;
  this.values.push(value);
  this.mins.push(Math.min(currentMin, value));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.values.pop();
  this.mins.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.values[this.values.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.mins[this.mins.length - 1];
};

module.exports = { MinStack };
