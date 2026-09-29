/**
 * 2076. Process Restricted Friend Requests
 * https://leetcode.com/problems/process-restricted-friend-requests/
 * DSU of friend groups. A request is accepted unless merging the two groups would put some restricted pair in one group; check every restriction against the two roots.
 */
var friendRequests = function (n, restrictions, requests) {
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const res = new Array(requests.length);
  for (let j = 0; j < requests.length; j++) {
    const a = find(requests[j][0]), b = find(requests[j][1]);
    if (a === b) { res[j] = true; continue; }
    let ok = true;
    for (const [x, y] of restrictions) {
      const rx = find(x), ry = find(y);
      if ((rx === a && ry === b) || (rx === b && ry === a)) { ok = false; break; }
    }
    if (ok) parent[a] = b;
    res[j] = ok;
  }
  return res;
};

module.exports = { friendRequests };
