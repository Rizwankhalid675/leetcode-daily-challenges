# 79. Word Search

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, string, backtracking, depth-first-search, matrix |
| Link | https://leetcode.com/problems/word-search/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Can the word be traced through horizontally/vertically adjacent cells of the grid, using each cell at most once?

## Approach
Backtracking DFS from every cell. The current path is marked by overwriting the cell with `#` and restoring it on the way back.

Two cheap pre-checks save a lot on bad inputs:
1. **Letter counts:** if the board has fewer copies of some letter than the word needs, return false immediately.
2. **Search from the rarer end:** if the word's first letter is more common on the board than its last letter, search the reversed word (a path traced backwards is still a valid path). Fewer starts means much less wasted branching, e.g. an all-'A' board with the word "AAA…AB".

## Key constraints
- Board up to 6x6, word up to 15 letters: the recursion depth is at most 15.

## Edge cases
- Word longer than the number of cells.
- Letters are case-sensitive.

## Complexity
- Time: O(m·n·3^L) worst case (L = word length)
- Space: O(L) recursion

## Testing note
The oracle explores paths with a fresh visited Set per step (no pruning, no in-place marking). The tests check random boards over a 3-letter alphabet, check that the board is restored, and time a board full of 'A's.

## Reusable pattern
**Backtracking with in-place marking**, plus **cheap feasibility pruning** (counts, rarer end first) before the search itself.
