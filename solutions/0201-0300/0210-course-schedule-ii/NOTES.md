# 210. Course Schedule II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, graph, topological-sort |
| Link | https://leetcode.com/problems/course-schedule-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Courses have "take b before a" rules. Return any order that takes all courses respecting the rules, or an empty array if that's impossible.

## Approach
Topological sort with Kahn's algorithm:
- Count incoming edges (unmet prerequisites) for every course.
- Start with all courses that have none. Taking a course removes one prerequisite from each course that depends on it; any that hit zero join the queue.
- The `order` array serves as the queue itself.

## Why it works
A course in a cycle always has at least one unmet prerequisite from within the cycle, so it never reaches zero. Therefore `order.length < numCourses` exactly when a cycle exists.

## Edge cases
- No prerequisites: any permutation works; this returns 0..n-1.
- Two-course cycle.

## Complexity
- Time: O(V + E)
- Space: O(V + E)

## Testing note
Many orders are valid, so the tests check validity (a permutation where every prerequisite comes first). Whether a cycle exists is decided independently with a transitive-closure check, and the answer must be `[]` exactly then.

## Reusable pattern
**Kahn's algorithm = topological order + cycle detection in one pass** (same core as 207).
