# 1732. Find the Highest Altitude

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, prefix-sum |
| Link | https://leetcode.com/problems/find-the-highest-altitude/ |
| Study plan | LeetCode 75 (Prefix Sum) |

## What it asks (own words)
Starting at altitude 0, you're given the change in altitude for each leg of a trip. What's the highest altitude
reached, including the start?

## Key constraints
- n ≤ 100, gains in ±100.

## Approach
Keep a running sum (the prefix sum is the current altitude) and track its maximum, starting from 0.

## Why it works
The altitude at point i+1 is the sum of the first i+1 gains, which is a prefix sum by definition.

## Edge cases
- All gains negative: the start (0) is the highest point, so `highest` must be initialized to 0, not −∞.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Prefix sums as positions.** A sequence of deltas becomes absolute values by accumulating them. Remember the
implicit starting value.
