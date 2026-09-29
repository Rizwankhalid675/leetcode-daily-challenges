/**
 * 1912. Design Movie Rental System
 * https://leetcode.com/problems/design-movie-rental-system/
 * Min-heaps with lazy deletion: one per movie for unrented copies (price, shop) and one global heap for rented copies (price, shop, movie), each packed into a single number. Queries pop until 5 valid distinct entries are found, then push those back.
 */
const SHOP_BASE = 300000; // shops < 3e5
const MOVIE_BASE = 10001; // movies <= 1e4
function heapPush(h, x) {
  let i = h.length;
  h.push(x);
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (h[p] <= x) break;
    h[i] = h[p];
    i = p;
  }
  h[i] = x;
}
function heapPop(h) {
  const top = h[0];
  const last = h.pop();
  const n = h.length;
  if (n > 0) {
    let i = 0;
    for (;;) {
      let c = 2 * i + 1;
      if (c >= n) break;
      if (c + 1 < n && h[c + 1] < h[c]) c++;
      if (h[c] >= last) break;
      h[i] = h[c];
      i = c;
    }
    h[i] = last;
  }
  return top;
}
var MovieRentingSystem = function (n, entries) {
  this.price = new Map(); // shop * MOVIE_BASE + movie -> price
  this.rented = new Set(); // shop * MOVIE_BASE + movie
  this.avail = new Map(); // movie -> min-heap of price * SHOP_BASE + shop (may hold stale/duplicate keys)
  this.out = []; // min-heap of (price * SHOP_BASE + shop) * MOVIE_BASE + movie (may hold stale/duplicate keys)
  for (const [s, m, p] of entries) {
    this.price.set(s * MOVIE_BASE + m, p);
    let h = this.avail.get(m);
    if (!h) {
      h = [];
      this.avail.set(m, h);
    }
    h.push(p * SHOP_BASE + s);
  }
  for (const h of this.avail.values()) h.sort((a, b) => a - b); // a sorted array is a valid heap
};
MovieRentingSystem.prototype.search = function (movie) {
  const h = this.avail.get(movie);
  if (!h) return [];
  const res = [];
  const keep = [];
  while (h.length > 0 && res.length < 5) {
    const key = heapPop(h);
    const s = key % SHOP_BASE;
    if (this.rented.has(s * MOVIE_BASE + movie)) continue; // stale: drop it
    if (keep.length > 0 && keep[keep.length - 1] === key) continue; // duplicate: drop it
    keep.push(key);
    res.push(s);
  }
  for (const key of keep) heapPush(h, key);
  return res;
};
MovieRentingSystem.prototype.rent = function (shop, movie) {
  const id = shop * MOVIE_BASE + movie;
  this.rented.add(id);
  heapPush(this.out, (this.price.get(id) * SHOP_BASE + shop) * MOVIE_BASE + movie);
};
MovieRentingSystem.prototype.drop = function (shop, movie) {
  const id = shop * MOVIE_BASE + movie;
  this.rented.delete(id);
  heapPush(this.avail.get(movie), this.price.get(id) * SHOP_BASE + shop);
};
MovieRentingSystem.prototype.report = function () {
  const h = this.out;
  const res = [];
  const keep = [];
  while (h.length > 0 && res.length < 5) {
    const key = heapPop(h);
    const m = key % MOVIE_BASE;
    const s = Math.floor(key / MOVIE_BASE) % SHOP_BASE;
    if (!this.rented.has(s * MOVIE_BASE + m)) continue;
    if (keep.length > 0 && keep[keep.length - 1] === key) continue;
    keep.push(key);
    res.push([s, m]);
  }
  for (const key of keep) heapPush(h, key);
  return res;
};

module.exports = { MovieRentingSystem };
