/**
 * 3525. Find X Value of Array II
 * https://leetcode.com/problems/find-x-value-of-array-ii/
 *
 * Each query asks: after a point update, for the array starting at `start`, how many
 * non-empty prefixes nums[start..j] have product == x (mod k)?
 *
 * Segment tree. Each node over a range stores:
 *   prod     = product of the range mod k
 *   cnt[r]   = number of non-empty prefixes of the range whose product mod k is r
 * Merging left segment L with right segment R (L first):
 *   prod = L.prod * R.prod
 *   cnt  = L.cnt, plus for each r: every prefix of R extended by all of L -> L.prod * r
 * k <= 5, so a merge is O(k). Queries on [start, n-1] merge O(log n) nodes left to right.
 *
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function (nums, k, queries) {
  const n = nums.length;
  const size = 4 * n;
  const prod = new Int32Array(size);
  const cnt = new Int32Array(size * k); // cnt[node * k + r]

  const setLeaf = (node, value) => {
    const v = value % k;
    prod[node] = v;
    cnt.fill(0, node * k, node * k + k);
    cnt[node * k + v] = 1;
  };
  const pull = (node) => {
    const L = node * 2;
    const R = node * 2 + 1;
    const lp = prod[L];
    prod[node] = (lp * prod[R]) % k;
    for (let r = 0; r < k; r++) cnt[node * k + r] = cnt[L * k + r];
    for (let r = 0; r < k; r++) cnt[node * k + ((lp * r) % k)] += cnt[R * k + r];
  };
  const build = (node, lo, hi) => {
    if (lo === hi) return setLeaf(node, nums[lo]);
    const mid = (lo + hi) >> 1;
    build(node * 2, lo, mid);
    build(node * 2 + 1, mid + 1, hi);
    pull(node);
  };
  const update = (node, lo, hi, idx, value) => {
    if (lo === hi) return setLeaf(node, value);
    const mid = (lo + hi) >> 1;
    if (idx <= mid) update(node * 2, lo, mid, idx, value);
    else update(node * 2 + 1, mid + 1, hi, idx, value);
    pull(node);
  };

  // accumulator for a left-to-right query: product so far and prefix counts so far
  let accProd = 1 % k;
  const accCnt = new Array(k).fill(0);
  const absorb = (node) => {
    for (let r = 0; r < k; r++) accCnt[(accProd * r) % k] += cnt[node * k + r];
    accProd = (accProd * prod[node]) % k;
  };
  const query = (node, lo, hi, from) => {
    if (hi < from) return;
    if (lo >= from) return absorb(node);
    const mid = (lo + hi) >> 1;
    query(node * 2, lo, mid, from); // left part first keeps the order correct
    query(node * 2 + 1, mid + 1, hi, from);
  };

  build(1, 0, n - 1);
  const result = [];
  for (const [index, value, start, x] of queries) {
    update(1, 0, n - 1, index, value);
    accProd = 1 % k;
    accCnt.fill(0);
    query(1, 0, n - 1, start);
    result.push(accCnt[x]);
  }
  return result;
};

module.exports = { resultArray };
