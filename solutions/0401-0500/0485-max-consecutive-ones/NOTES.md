# 485. Max Consecutive Ones

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array |
| Link | https://leetcode.com/problems/max-consecutive-ones/ |
| Context | Quest: DSA / Linear Shoal / Array I |

## What it asks (own words)
Length of the longest block of consecutive 1s in a 0/1 array.

## Approach
Keep the current run length (reset on 0) and the maximum seen.

## Edge cases
- All zeros → 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
Run-length tracking in one pass (the basis of 1004, where k zeros may be flipped).
