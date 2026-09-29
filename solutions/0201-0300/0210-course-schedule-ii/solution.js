/**
 * 210. Course Schedule II
 * https://leetcode.com/problems/course-schedule-ii/
 * Kahn's algorithm: repeatedly take courses with no remaining prerequisites. If some courses never
 * reach in-degree 0, there is a cycle and the answer is [].
 */
var findOrder = function (numCourses, prerequisites) {
  const indeg = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    indeg[course]++;
  }
  const order = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) order.push(i);
  for (let head = 0; head < order.length; head++) {
    for (const next of adj[order[head]]) {
      if (--indeg[next] === 0) order.push(next);
    }
  }
  return order.length === numCourses ? order : [];
};

module.exports = { findOrder };
