# 228. Summary Ranges

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array |
| Link | https://leetcode.com/problems/summary-ranges/ |
| Study plan | Top Interview 150 (Intervals) |

## What it asks (own words)
Compress a sorted list of distinct integers into ranges ("a->b", or "a" for a single number).

## Key constraints
- Up to 20 values, spanning the full 32-bit range.

## Approach
From each run start i, extend j while the next value is exactly one more. Output the run, then continue from j + 1.

## Why it works
In a sorted distinct array, maximal runs of consecutive values are exactly the smallest set of covering ranges.

## Edge cases
- Empty array → [].
- Extreme values: `nums[j] + 1` is exact in JS. In 32-bit languages, `2³¹ − 1 + 1` overflows, a classic bug for this
  problem.

## Complexity
- Time: O(n)
- Space: O(1) besides the output

## Reusable pattern
**Run-length grouping with an inner extend loop.**
