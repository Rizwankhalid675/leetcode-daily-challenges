const test = require('node:test');
const assert = require('node:assert');
const { MovieRentingSystem } = require('./solution');

class RefSystem {
  constructor(n, entries) { this.e = entries.map(([s, m, p]) => ({ s, m, p, out: false })); }
  find(s, m) { return this.e.find((x) => x.s === s && x.m === m); }
  search(m) {
    return this.e.filter((x) => x.m === m && !x.out).sort((a, b) => a.p - b.p || a.s - b.s).slice(0, 5).map((x) => x.s);
  }
  rent(s, m) { this.find(s, m).out = true; }
  drop(s, m) { this.find(s, m).out = false; }
  report() {
    return this.e.filter((x) => x.out).sort((a, b) => a.p - b.p || a.s - b.s || a.m - b.m).slice(0, 5).map((x) => [x.s, x.m]);
  }
}

test('official example', () => {
  const sys = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
  assert.deepStrictEqual(sys.search(1), [1, 0, 2]);
  sys.rent(0, 1);
  sys.rent(1, 2);
  assert.deepStrictEqual(sys.report(), [[0, 1], [1, 2]]);
  sys.drop(1, 2);
  assert.deepStrictEqual(sys.search(2), [0, 1]);
});

test('search for a movie nobody stocks is empty', () => {
  const sys = new MovieRentingSystem(1, [[0, 1, 5]]);
  assert.deepStrictEqual(sys.search(2), []);
  assert.deepStrictEqual(sys.report(), []);
});

test('matches a brute-force filter-and-sort under random operations', () => {
  for (let t = 0; t < 300; t++) {
    const n = 1 + Math.floor(Math.random() * 8);
    const entries = [];
    for (let s = 0; s < n; s++) for (let m = 1; m <= 3; m++) if (Math.random() < 0.7) entries.push([s, m, 1 + Math.floor(Math.random() * 4)]);
    if (!entries.length) entries.push([0, 1, 1]);
    const sys = new MovieRentingSystem(n, entries);
    const ref = new RefSystem(n, entries);
    for (let op = 0; op < 120; op++) {
      const r = Math.random();
      if (r < 0.25) {
        const m = 1 + Math.floor(Math.random() * 4);
        assert.deepStrictEqual(sys.search(m), ref.search(m));
      } else if (r < 0.5) {
        assert.deepStrictEqual(sys.report(), ref.report());
      } else {
        const x = ref.e[Math.floor(Math.random() * ref.e.length)];
        if (x.out) { sys.drop(x.s, x.m); ref.drop(x.s, x.m); } else { sys.rent(x.s, x.m); ref.rent(x.s, x.m); }
      }
    }
  }
});

test('1e5 entries and 1e5 operations run fast', () => {
  const entries = [];
  for (let i = 0; i < 100000; i++) entries.push([i % 300000, 1 + (i % 5), 1 + Math.floor(Math.random() * 10000)]);
  const start = Date.now();
  const sys = new MovieRentingSystem(300000, entries);
  const rentedList = [];
  for (let op = 0; op < 100000; op++) {
    const r = op % 4;
    if (r === 0) sys.search(1 + (op % 5));
    else if (r === 1) sys.report();
    else if (r === 2 || rentedList.length === 0) {
      const e = entries[Math.floor(Math.random() * entries.length)];
      if (!sys.rented.has(e[0] * 10001 + e[1])) { sys.rent(e[0], e[1]); rentedList.push(e); }
    } else {
      const e = rentedList.pop();
      sys.drop(e[0], e[1]);
    }
  }
  assert.ok(Date.now() - start < 1500);
});
