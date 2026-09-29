# 1275. Find Winner on a Tic Tac Toe Game

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table, matrix, simulation |
| Link | https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Replay a legal tic-tac-toe game (A moves first) and report "A", "B", "Draw" (board full, no winner) or "Pending".

## Approach
Give A's moves +1 and B's −1. Keep a counter for each row, column and the two diagonals; a line totals ±3 only if one player owns all three cells. Check after each move; if nobody wins, it's a draw after 9 moves, otherwise pending.

## Edge cases
- A winning 9th move is a win, not a draw (the winner check comes first).
- Anti-diagonal cells satisfy `r + c === 2`; the centre belongs to both diagonals.

## Complexity
- Time: O(m) with m ≤ 9
- Space: O(1)

## Testing note
Compared with a grid-based line checker on random legal games (random cell order, stopping when someone wins).

## Reusable pattern
**Signed line counters** — O(1) win detection for n×n tic-tac-toe (see design-tic-tac-toe, 348).
