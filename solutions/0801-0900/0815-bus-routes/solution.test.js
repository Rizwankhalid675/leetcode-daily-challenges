const test = require('node:test');
const assert = require('node:assert');
const { numBusesToDestination } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// oracle: Floyd over routes (two routes adjacent if they share a stop)
function brute(routes, source, target) {
  if (source === target) return 0;
  const k = routes.length;
  const sets = routes.map((r) => new Set(r));
  const D = Array.from({ length: k }, (_, i) => Array.from({ length: k }, (_, j) => (i === j ? 0 : [...sets[i]].some((s) => sets[j].has(s)) ? 1 : Infinity)));
  for (let m = 0; m < k; m++) for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) D[i][j] = Math.min(D[i][j], D[i][m] + D[m][j]);
  let best = Infinity;
  for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) if (sets[i].has(source) && sets[j].has(target)) best = Math.min(best, D[i][j] + 1);
  return best === Infinity ? -1 : best;
}

test('official examples', () => {
  assert.strictEqual(numBusesToDestination([[1, 2, 7], [3, 6, 7]], 1, 6), 2);
  assert.strictEqual(numBusesToDestination([[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12), -1);
});

test('source equals target needs no bus, even if the stop is on no route', () => {
  assert.strictEqual(numBusesToDestination([[1, 2]], 5, 5), 0);
  assert.strictEqual(numBusesToDestination([[1, 2]], 1, 1), 0);
});

test('stops missing from all routes', () => {
  assert.strictEqual(numBusesToDestination([[1, 2]], 1, 3), -1);
  assert.strictEqual(numBusesToDestination([[1, 2]], 3, 1), -1);
});

test('matches route-graph Floyd on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const k = ri(1, 6);
    const routes = Array.from({ length: k }, () => [...new Set(Array.from({ length: ri(1, 4) }, () => ri(0, 10)))]);
    const s = ri(0, 11), g = ri(0, 11);
    assert.strictEqual(numBusesToDestination(routes, s, g), brute(routes, s, g));
  }
});

test('large input runs fast', () => {
  // 500 routes, 1e5 stops total, chained by one shared stop each
  const routes = [];
  for (let r = 0; r < 500; r++) {
    const a = [];
    for (let i = 0; i < 200; i++) a.push(r * 199 + i);
    routes.push(a);
  }
  const t0 = Date.now();
  assert.strictEqual(numBusesToDestination(routes, 0, 499 * 199 + 199), 500);
  assert.ok(Date.now() - t0 < 1000);
});
