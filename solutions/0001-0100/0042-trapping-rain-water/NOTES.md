# 42. Trapping Rain Water

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, two-pointers, dynamic-programming, stack, monotonic-stack |
| Link | https://leetcode.com/problems/trapping-rain-water/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Bars of width 1 form an elevation map. How much rain water is trapped between them?

## Key constraints
- n up to 2·10⁴.

## Approach
Water above bar i = `min(tallest bar to its left, tallest to its right) − height[i]` (both maxima include i itself).
**Two pointers** avoid storing both maximum arrays: keep `leftMax` and `rightMax` as the pointers move inward. If
`leftMax ≤ rightMax`, the left bar's water is exactly `leftMax − height[lo]`, because its right side has something at
least as tall as `rightMax ≥ leftMax`. Add it and move lo. Otherwise do the symmetric step on the right.

## Why it works
The side with the smaller running maximum is the bottleneck. Its true bound, the min of both maxima, equals its own
running max, even though the other side's full maximum isn't known yet.

## Edge cases
- Fewer than three bars, or monotone heights → 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
- Precompute prefix-max and suffix-max arrays (O(n) space). This is the easiest to reason about, and it's the test
  reference in formula form.
- A monotonic stack that fills water layer by layer between bounding bars.

## Reusable pattern
**"Bounded by the min of two sides" → move the pointer on the smaller side.** It's the same reasoning as 11 (Container
With Most Water).
