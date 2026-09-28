# 2300. Successful Pairs of Spells and Potions

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, binary-search, sorting |
| Link | https://leetcode.com/problems/successful-pairs-of-spells-and-potions/ |
| Study plan | LeetCode 75 (Binary Search) |

## What it asks (own words)
For each spell, count the potions whose strength times the spell's strength is at least `success`.

## Key constraints
- n, m up to 10⁵ → O(n·m) is too slow. Products up to 10¹⁰ are exact in JS.

## Approach
Sort the potions once. For each spell, binary search the **first** potion p with `spell · p ≥ success`
(a lower-bound search). Every potion after it also works, so the count is `m − index`.

## Why it works
For a fixed spell, `spell · p` increases with p, so the successful potions form a suffix of the sorted list.

## JavaScript implementation details
- Compare `spell * sorted[mid] >= success` directly, rather than computing `Math.ceil(success / spell)`, to avoid any
  floating-point rounding at the boundary.
- Sort a copy (`[...potions]`), since mutating the caller's array is a side effect.
- `(lo + hi) >> 1` is safe here because indices are < 10⁵ (compare 374, where it isn't).

## Edge cases
- The product exactly equals success (≥, not >).
- No potion succeeds → 0.

## Complexity
- Time: O((n + m) log m)
- Space: O(m) for the sorted copy

## Alternatives
Sort the spells too, then sweep with two pointers in O(n log n + m log m). This needs the original spell order
restored afterwards.

## Reusable pattern
**Sort one side, binary search from the other**, for counting pairs that satisfy a monotone condition.
