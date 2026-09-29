/**
 * 2723. Add Two Promises
 * https://leetcode.com/problems/add-two-promises/
 * Wait for both promises concurrently with Promise.all and return the sum.
 */
/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function (promise1, promise2) {
  const [a, b] = await Promise.all([promise1, promise2]);
  return a + b;
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */

module.exports = { addTwoPromises };
