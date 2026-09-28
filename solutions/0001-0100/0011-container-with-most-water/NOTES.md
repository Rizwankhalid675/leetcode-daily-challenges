# 11. Container With Most Water

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, greedy |
| Link | https://leetcode.com/problems/container-with-most-water/ |
| Study plan | LeetCode 75 (Two Pointers) |

## What it asks (own words)
Pick two vertical lines. The water they hold is their distance apart times the shorter line's height. Maximize that.

## Key constraints
- n up to 10⁵, so O(n²) pairs is too slow.

## Approach
Start with the widest pair (both ends). Record its area, then move the pointer at the **shorter** line inward. Repeat
until the pointers meet.

## Why it works
Say `height[lo] ≤ height[hi]`. Every pair (lo, j) with j < hi has a smaller width and height at most `height[lo]`, so
its area can't beat the current one. All pairs involving lo are settled, and lo can be discarded. Each step discards
one line safely, so all n lines are processed in O(n).

## Edge cases
- Equal heights: moving either pointer is safe (the argument works for either side).
- Zero heights → area 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Converging two pointers with an elimination argument.** Each move must be justified by "every pair involving the
discarded element is dominated". The same reasoning is used in 2-Sum on a sorted array (167) and 3Sum (15).
