/**
 * 2621. Sleep
 * https://leetcode.com/problems/sleep/
 * Wrap setTimeout in a Promise that resolves after millis milliseconds.
 */
/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

module.exports = { sleep };
