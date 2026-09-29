/**
 * 815. Bus Routes
 * https://leetcode.com/problems/bus-routes/
 * BFS where each level is one bus ride: from the current stops, board every unused route through them and enqueue all its stops. Each route and each stop is expanded once.
 */
var numBusesToDestination = function (routes, source, target) {
  if (source === target) return 0;
  const byStop = new Map();
  for (let r = 0; r < routes.length; r++) {
    for (const s of routes[r]) {
      let list = byStop.get(s);
      if (!list) byStop.set(s, (list = []));
      list.push(r);
    }
  }
  if (!byStop.has(source) || !byStop.has(target)) return -1;
  const usedRoute = new Uint8Array(routes.length);
  const seenStop = new Set([source]);
  let frontier = [source];
  for (let buses = 1; frontier.length; buses++) {
    const next = [];
    for (const s of frontier) {
      for (const r of byStop.get(s)) {
        if (usedRoute[r]) continue;
        usedRoute[r] = 1;
        for (const t of routes[r]) {
          if (t === target) return buses;
          if (!seenStop.has(t)) {
            seenStop.add(t);
            next.push(t);
          }
        }
      }
    }
    frontier = next;
  }
  return -1;
};

module.exports = { numBusesToDestination };
