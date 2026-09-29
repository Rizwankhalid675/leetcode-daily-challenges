/**
 * 133. Clone Graph
 * https://leetcode.com/problems/clone-graph/
 * BFS over the original graph with a Map from original node to its copy; each edge is wired
 * when it is scanned, and a node is copied (and queued) the first time it is seen.
 */
var cloneGraph = function (node) {
  if (!node) return null;
  const copies = new Map([[node, new _Node(node.val)]]);
  const queue = [node];
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    const copy = copies.get(cur);
    for (const nb of cur.neighbors) {
      if (!copies.has(nb)) {
        copies.set(nb, new _Node(nb.val));
        queue.push(nb);
      }
      copy.neighbors.push(copies.get(nb));
    }
  }
  return copies.get(node);
};

module.exports = { cloneGraph };
