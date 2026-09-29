# 2267. Check if There Is a Valid Parentheses String Path

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, dynamic-programming, matrix, bracket-sequences |
| Link | https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/ |
| Daily Challenge | 2026-09-29 |

## What it asks (own words)
Each cell of a grid holds '(' or ')'. Is there a path from the top-left to the bottom-right, moving only right or
down, whose characters form a valid parentheses string?

## Key constraints
- m, n ≤ 100. There are far too many paths to enumerate, but the path length is only m + n − 1 ≤ 199.

## Approach
A bracket string is valid iff its running balance (opens minus closes) never drops below 0 and ends at 0 (see 1614).
So a path's only relevant state at a cell is its **balance**. DP: for each cell, keep the *set* of balances reachable
on some path ending there. Take the sets from above and from the left, shift each by ±1, and drop:
- negative balances (already invalid);
- balances larger than the number of cells still to come (they can't be closed in time).

Early exits: an odd path length, a ')' at the start, or a '(' at the end → false.

## Why it works
Two partial paths that reach the same cell with the same balance are interchangeable for everything that follows, so
the set of balances captures everything that matters. Pruning only removes states that can never end at 0 without
going negative.

## JavaScript implementation details
- The sets are `Uint8Array` flags indexed by balance (≤ 100). Two rolling rows keep memory to O(n · B).

## Edge cases
- Odd total length → impossible.
- A 1×2 grid "()".

## Complexity
- Time: O(m · n · (m + n))
- Space: O(n · (m + n))

## Testing note
Compared against enumeration of every right/down path on 2000 random grids up to 5×5, plus a 100×100 timing test.

## Reusable pattern
**Bracket validity = running balance** (from 1614/1190/20), combined with **grid-path DP whose state is a set of
values**. A bitset (or BigInt shifts) makes the sets faster still.
