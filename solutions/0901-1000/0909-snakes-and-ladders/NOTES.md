# 909. Snakes and Ladders

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, breadth-first-search, matrix |
| Link | https://leetcode.com/problems/snakes-and-ladders/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
A board numbered 1..n² in a zigzag from the bottom-left. Each move rolls 1–6; if you land on a snake or ladder you must take it (only that one). Find the fewest moves from 1 to n², or -1.

## Approach
1. Flatten the board once into `jump[label]`, walking rows bottom-up and flipping direction each row.
2. BFS from square 1. Neighbors of `s` are `s+1..s+6` (capped at n²), each replaced by its jump target if it has one.
3. The first time n² is dequeued, its distance is the answer.

## Key constraints
- A jump's destination is **not** followed again, even if it has its own snake or ladder.
- Squares 1 and n² have no jumps.

## Edge cases
- Target unreachable (every roll forced back by snakes): return -1.
- A ladder straight to n² on the first move.

## Complexity
- Time: O(n²·6)
- Space: O(n²)

## Testing note
The oracle converts labels to coordinates with arithmetic (not the flattening loop) and computes shortest distances by repeated relaxation. It's checked on random boards, plus a case where chaining two ladders would give a wrong answer.

## Reusable pattern
**Flatten an awkward coordinate system first, then run plain BFS on labels.**
