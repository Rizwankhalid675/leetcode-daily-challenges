# 289. Game of Life

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, matrix, simulation |
| Link | https://leetcode.com/problems/game-of-life/ |
| Study plan | Top Interview 150 (Matrix) |

## What it asks (own words)
Advance Conway's Game of Life by one generation **in place**, with every cell updated simultaneously.

## Key constraints
- Up to 25×25. The difficulty is the simultaneous update without copying the board.

## Approach
Use **two bits per cell**: bit 0 is the current state and bit 1 is the next state. While counting neighbours, read
only `& 1`, so cells already visited in this pass still show their old state. Set bit 1 when the cell lives next
generation, then shift every cell right by one.

## Why it works
The next-state bit is invisible to neighbour counting, so all decisions use the original generation. That's exactly
"simultaneous".

## Edge cases
- Board edges (fewer neighbours).
- A 1×1 board, where a lone cell always dies.

## Complexity
- Time: O(8·m·n)
- Space: O(1)

## Testing note
Compared against a straightforward out-of-place implementation on 500 random boards.

## Reusable pattern
**Encode old and new state in the same cell** (extra bits, or sentinel values like −1/2) to update in place without a
copy.
