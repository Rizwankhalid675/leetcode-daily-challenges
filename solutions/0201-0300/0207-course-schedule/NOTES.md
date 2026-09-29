# 207. Course Schedule

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, graph, topological-sort, directed-acyclic-graph |
| Link | https://leetcode.com/problems/course-schedule/ |
| Context | Quest: 2026 Spring Sprint / Week 1: Practice / Practice III |

## What it asks (own words)
Courses have prerequisite pairs. Can every course be completed, i.e. is the dependency graph free of cycles?

## Key constraints
- Up to 2000 courses and 5000 prerequisite pairs.

## Approach
Kahn's algorithm. Build an edge from each prerequisite to the course that needs it, and count each course's in-degree. Put every course with in-degree 0 in a queue. Pop courses and lower their dependents' in-degrees, queueing any that reach 0. If all courses were queued, they can all be finished.

## Why it works
A course in a cycle always has an unmet prerequisite from the cycle, so its in-degree never reaches 0. Without a cycle, some course always has in-degree 0 and the process continues until every course is taken.

## Edge cases
- A self-loop `[a, a]` is a cycle.
- Duplicate pairs are counted twice in both the in-degree and the adjacency list, so they stay consistent.

## Complexity
- Time: O(V + E)
- Space: O(V + E)

## Testing note
Compared with a three-colour DFS cycle check on 1000 random small graphs (including self-loops and duplicate edges), plus a 2000-course chain with and without a closing edge.

## Reusable pattern
**Kahn's algorithm** answers "is there a valid order?" without recursion.
