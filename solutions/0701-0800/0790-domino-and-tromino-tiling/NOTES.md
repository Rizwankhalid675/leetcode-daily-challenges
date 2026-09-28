# 790. Domino and Tromino Tiling

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming |
| Link | https://leetcode.com/problems/domino-and-tromino-tiling/ |
| Study plan | LeetCode 75 (DP - 1D) |

## What it asks (own words)
Count the ways to tile a 2×n board with 2×1 dominoes and L-shaped trominoes (any rotation), modulo 10⁹+7.

## Key constraints
- n ≤ 1000.

## Derivation
Let f(n) be the number of tilings of a full 2×n board, and g(n) the number of tilings of a 2×n board plus one extra
cell sticking out in column n+1 (by symmetry, either row gives the same count).

Look at how the leftmost column is covered:
- a vertical domino → f(n−1);
- two horizontal dominoes stacked → f(n−2);
- a tromino covering the column plus one cell of the next column → leaves a "jagged" board, 2·g(n−2) ways (two
  mirror images).

So f(n) = f(n−1) + f(n−2) + 2·g(n−2). For the jagged board, g(k) = f(k−1) + g(k−1): cap it with a tromino, or with a
horizontal domino that continues the jag.

Eliminating g gives the compact form **f(n) = 2·f(n−1) + f(n−3)**, with f(0) = 1, f(1) = 1, f(2) = 2. Check:
f(3) = 2·2 + 1 = 5 ✓.

## Approach
Iterate the recurrence modulo 10⁹+7. The values stay below 3·10⁹, which is exact in JS numbers.

## Why it works
The case analysis on the leftmost column is exhaustive and the cases don't overlap. The algebraic elimination is
confirmed numerically against a brute-force tiling enumerator.

## Edge cases
- n = 1 → 1, n = 2 → 2.

## Complexity
- Time: O(n)
- Space: O(n) (O(1) is possible with three rolling values)

## Testing note
The test builds real tilings by backtracking. It always covers the first empty cell with each distinct shape (2
dominoes and 4 tromino rotations) and counts complete tilings for n = 1..10, matching the recurrence exactly. I trust
this derivation because of that independent check, not because the formula is well known.

## Bugs / debugging
The first run of that oracle reported 5 tilings for n = 2 (the true count is 2). The bug was in the **oracle**: I had
listed a "top-row" and a "bottom-row" horizontal domino as separate shapes. Because each shape is translated so its
first cell lands on the first empty cell, both became the same placement, so every horizontal domino was counted
twice (1 + 2·2 = 5). With the duplicate removed, the oracle agrees with the recurrence for every n tested. The lesson
is that a brute-force check needs checking too. Hand-computing a tiny case (n = 2) quickly showed which side was
wrong.

## Reusable pattern
**Tiling DP with "broken profile" helper states** (the jagged board g). Write the full-board and partial-board states,
then simplify.
