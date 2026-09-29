# 70. Climbing Stairs

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, dynamic-programming, memoization |
| Link | https://leetcode.com/problems/climbing-stairs/ |
| Context | Quest: DSA / Strategy Summit / Dynamic Programming |

## What it asks (own words)
Count the ordered sequences of 1-steps and 2-steps that add up to n.

## Approach
Classify each sequence by its final move: it ends with a 1-step (then the rest reaches n-1) or a 2-step (rest reaches n-2). So ways(n) = ways(n-1) + ways(n-2), with ways(0) = ways(1) = 1. Keep only the last two values.

## Edge cases
- n = 1 returns 1 (loop never runs).
- n = 45 gives 1836311903, well within safe integers.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Checked against the naive recursion for n up to 25, plus the known value for n = 45.

## Reusable pattern
**Split by the last decision** to get a recurrence, then roll the DP array down to the few states it actually reads.
