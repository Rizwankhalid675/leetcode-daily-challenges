/**
 * 2721. Execute Asynchronous Functions in Parallel
 * https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/
 * Start every function at once; store each result at its index, resolve when the settled count hits n, and reject on the first failure (no Promise.all).
 */
/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  return new Promise((resolve, reject) => {
    const n = functions.length;
    const results = new Array(n);
    let done = 0;
    if (n === 0) return resolve(results);
    for (let i = 0; i < n; i++) {
      functions[i]()
        .then((v) => {
          results[i] = v;
          if (++done === n) resolve(results);
        })
        .catch(reject);
    }
  });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */

module.exports = { promiseAll };
