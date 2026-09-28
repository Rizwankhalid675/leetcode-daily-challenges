# 209. Minimum Size Subarray Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, sliding-window, prefix-sum |
| Link | https://leetcode.com/problems/minimum-size-subarray-sum/ |
| Study plan | Top Interview 150 (Sliding Window) |

## What it asks (own words)
Find the shortest contiguous block whose sum is at least `target` (0 if none).

## Key constraints
- n up to 10⁵, and all values are **positive**, so a sliding window works.

## Approach
Extend the right edge and add to the sum. While the sum is ≥ target, record the window length and shrink from the left.

## Why it works
With positive values, shrinking only lowers the sum. For each right end, the loop finds the shortest valid window
ending there, and the left edge never needs to move back.

## Edge cases
- The total is below target → 0.
- A single element that is already ≥ target → 1.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives (follow-up)
Prefix sums plus binary search: for each i, find the smallest j with `prefix[j] − prefix[i] ≥ target`. That's
O(n log n), and it also relies on positivity, which makes the prefix sums increasing.

## Reusable pattern
**Shortest window satisfying a monotone condition → shrink while valid.** For the longest window, shrink while
*invalid* (compare 1004, 3).
