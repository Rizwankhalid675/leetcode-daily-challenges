# 130. Surrounded Regions

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, depth-first-search, breadth-first-search, union-find, matrix |
| Link | https://leetcode.com/problems/surrounded-regions/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Flip every 'O' region that is completely enclosed by 'X' (doesn't reach the board's edge) into 'X', in place.

## Approach
Think in reverse: the survivors are exactly the 'O' cells reachable from an 'O' on the border.
1. Push every border 'O' onto a stack, marking it '#'.
2. Flood-fill with the stack, marking reachable 'O's as '#'.
3. Final pass: '#' becomes 'O', everything else becomes 'X'.

## Edge cases
- 1-row or 1-column boards: every cell is on the border, nothing flips.
- A 200x200 all-'O' board: a recursive DFS could go 40,000 deep, so the fill uses an explicit stack.

## Complexity
- Time: O(m·n)
- Space: O(m·n) for the stack in the worst case

## Testing note
Compared with an oracle that finds each 'O' component separately and flips it only if no cell touches the edge, on random boards; plus a max-size all-'O' board.

## Reusable pattern
**Mark the complement from the boundary**: when "enclosed" is hard to test directly, flood from the edges and treat everything unreached as enclosed.
