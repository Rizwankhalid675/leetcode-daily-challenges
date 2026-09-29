/**
 * 1998. GCD Sort of an Array
 * https://leetcode.com/problems/gcd-sort-of-an-array/
 * Union each value with its prime factors (SPF sieve up to max value, union-find over values). Sortable iff each position's current value and its sorted target value share a component.
 */
var gcdSort = function (nums) {
  let max = 0;
  for (const x of nums) if (x > max) max = x;
  const spf = new Int32Array(max + 1);
  for (let i = 2; i <= max; i++) {
    if (spf[i] !== 0) continue;
    for (let j = i; j <= max; j += i) if (spf[j] === 0) spf[j] = i;
  }
  const parent = new Int32Array(max + 1);
  for (let i = 0; i <= max; i++) parent[i] = i;
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const x of nums) {
    let y = x;
    while (y > 1) {
      const p = spf[y];
      const a = find(x), b = find(p);
      if (a !== b) parent[a] = b;
      while (y % p === 0) y /= p;
    }
  }
  const sorted = Int32Array.from(nums).sort();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== sorted[i] && find(nums[i]) !== find(sorted[i])) return false;
  }
  return true;
};

module.exports = { gcdSort };
