/**
 * 2704. To Be Or Not To Be
 * https://leetcode.com/problems/to-be-or-not-to-be/
 * Return an object with toBe / notToBe that compare with === and throw Error("Not Equal") / Error("Equal") on failure.
 */
/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
  return {
    toBe(other) {
      if (val !== other) throw new Error('Not Equal');
      return true;
    },
    notToBe(other) {
      if (val === other) throw new Error('Equal');
      return true;
    },
  };
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */

module.exports = { expect };
