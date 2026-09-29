# 84. Largest Rectangle in Histogram

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, stack, monotonic-stack, range-minimum-maximum-query |
| Link | https://leetcode.com/problems/largest-rectangle-in-histogram/ |
| Context | Quest: DSA / Linear Shoal / Monotonic Stack |

## What it asks (own words)
In a histogram of unit-width bars, find the area of the largest axis-aligned rectangle.

## Key constraints
- n up to 10⁵ → O(n²) over all ranges is too slow.

## Approach
For each bar, the best rectangle *using its height* spans to the nearest strictly lower bar on each side. A **monotonic increasing stack** finds both boundaries: when bar j is popped by a lower bar at i, i is j's right boundary and the new stack top is its left boundary; width = i − left − 1. A sentinel height 0 at the end flushes remaining bars.

## Why it works
The optimal rectangle's height equals some bar's height, and it extends until blocked by lower bars on both sides — exactly what each pop computes. Each index is pushed/popped once.

## Edge cases
- Equal heights: popping on `>=` is fine (the last equal bar computes the full width).
- Zero heights.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with the O(n²) all-ranges brute force on 1000 random histograms.

## Reusable pattern
**Pop time = the moment both nearest-smaller boundaries are known.** Basis of 85 (maximal rectangle, histogram per row) and 907 / 2104-style contribution counting.
