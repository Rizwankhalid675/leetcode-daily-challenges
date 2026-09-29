/**
 * 952. Largest Component Size by Common Factor
 * https://leetcode.com/problems/largest-component-size-by-common-factor/
 * Smallest-prime-factor sieve, then union each number with the first number seen for each of its prime factors; the biggest DSU set wins.
 */
var largestComponentSize = function (nums) {
  let max = 1;
  for (const x of nums) if (x > max) max = x;
  const spf = new Int32Array(max + 1);
  for (let i = 2; i <= max; i++) {
    if (spf[i] === 0) {
      for (let j = i; j <= max; j += i) if (spf[j] === 0) spf[j] = i;
    }
  }
  const n = nums.length;
  const parent = new Int32Array(n);
  const size = new Int32Array(n).fill(1);
  for (let i = 0; i < n; i++) parent[i] = i;
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const owner = new Int32Array(max + 1).fill(-1); // prime -> first index holding it
  let best = 1;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    while (x > 1) {
      const p = spf[x];
      while (x % p === 0) x /= p;
      if (owner[p] === -1) {
        owner[p] = i;
      } else {
        let a = find(i), b = find(owner[p]);
        if (a !== b) {
          if (size[a] < size[b]) { const t = a; a = b; b = t; }
          parent[b] = a;
          size[a] += size[b];
          if (size[a] > best) best = size[a];
        }
      }
    }
  }
  return best;
};

module.exports = { largestComponentSize };
