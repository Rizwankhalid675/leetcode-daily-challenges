# 643. Maximum Average Subarray I

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, sliding-window |
| Link | https://leetcode.com/problems/maximum-average-subarray-i/ |
| Study plan | LeetCode 75 (Sliding Window) |

## What it asks (own words)
Among all contiguous blocks of exactly k elements, which has the highest average?

## Key constraints
- n up to 10⁵; values in ±10⁴, so sums are at most 10⁹ in magnitude (exact).
- Answers within 10⁻⁵ are accepted.

## Approach
Sum the first k elements, then slide: add the entering element and subtract the leaving one. Track the maximum
**sum** and divide by k once at the end.

## Why it works
With k fixed, the highest average and the highest sum are the same block. Each window's sum is derived from the
previous one in O(1).

## Edge cases
- All negative values: `best` must start at the first window's sum, not 0.
- k = n: a single window.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Fixed-size sliding window:** update the aggregate incrementally in O(1) per step. Dividing once at the end also
avoids accumulating floating-point error.
