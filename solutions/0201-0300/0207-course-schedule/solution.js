/**
 * 207. Course Schedule
 * https://leetcode.com/problems/course-schedule/
 * Kahn's topological sort: repeatedly take courses with no unmet prerequisites; all courses
 * are finishable iff every course gets taken (no cycle).
 */
var canFinish = function (numCourses, prerequisites) {
  const indeg = new Int32Array(numCourses);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  for (let h = 0; h < queue.length; h++) {
    for (const next of adj[queue[h]]) if (--indeg[next] === 0) queue.push(next);
  }
  return queue.length === numCourses;
};

module.exports = { canFinish };
