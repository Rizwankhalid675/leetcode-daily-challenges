# Curriculum and order of work

The goal is every accessible problem, but the *order* is chosen so that each batch builds on the previous one and
counts toward legitimate LeetCode progress.

## Daily rule (always first)
1. At the start of each UTC day, solve the current Daily Challenge **inside its window** and confirm on LeetCode
   that the day shows as completed (`userStatus: Finish`). Record it with `--daily <date>`.
2. Missed days are reported as missed. They are never backfilled or bypassed.

## Stage 1: study plans that award badges (free)
Plans must first be started on LeetCode ("Start" button) for progress to count toward the badge.

| Order | Plan | Questions | Why here |
|---|---|---|---|
| 1 | LeetCode 75 | 75 | Broad fundamentals across 22 topics |
| 2 | Top Interview 150 | 150 (overlaps LC75) | Core interview coverage |
| 3 | Top 100 Liked | 100 (heavy overlap) | Mostly done by then |
| 4 | Programming Skills | 33+ | Implementation practice |
| 5 | Dynamic Programming | 46+ | First deep-dive topic |
| 6 | 30 Days of JavaScript | 30+ | JavaScript-track problems |
| 7 | SQL 50 | 50 | Database problems (SQL) |
| 8 | Introduction to Pandas | 15 | Pandas problems (Python) |

Binary Search, Graph Theory and 30 Days of Pandas each contain Premium-only questions. Their free questions are
still solved in Stage 2, but their badges are marked "requires Premium".

## Stage 2: fundamentals by topic (Easy → Medium)
Arrays and hashing → two pointers → sliding window → prefix sums → stacks/queues → linked lists → binary search →
trees → heaps → graphs (BFS/DFS) → backtracking → greedy/intervals → 1-D DP → bit manipulation → math.

## Stage 3: core Medium problems in larger topic batches
Multi-dimensional DP, topological sort, union-find, tries, monotonic stack/queue, Dijkstra, design problems.

## Stage 4: Hard problems and advanced families
Segment/Fenwick trees, advanced graphs (flows, SCC, bridges), digit DP, bitmask DP, string algorithms (KMP,
Z-function, hashing), geometry, game theory.

## Stage 5: remaining coverage
Everything else still unsolved in `progress/catalog.json`, in ID order within each topic, until the only unsolved
problems are Premium-only or genuinely blocked.

## Batching and commits
Work is committed in topic- or plan-sized batches (for example "solutions: LeetCode 75 arrays and two pointers"),
never one commit per problem.

## Checkpoints
50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500 and 4000 solved, then complete. Each checkpoint
refreshes the catalog, re-reads the account from LeetCode, and reports progress, badges, GitHub status, tests and
new patterns.
