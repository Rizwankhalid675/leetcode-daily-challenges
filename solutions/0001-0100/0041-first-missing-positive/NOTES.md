# 41. First Missing Positive

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table |
| Link | https://leetcode.com/problems/first-missing-positive/ |
| Context | Quest: DSA / Association Slope / Hash |

## What it asks (own words)
Find the smallest positive integer that is absent from an unsorted array, in linear time and constant extra space.

## Key constraints
- O(n) time and O(1) extra space are required, so no sorting and no Set.

## Approach
The answer is always in 1..n+1, so only values in 1..n matter. Treat index v−1 as the "home" of value v: for each slot, keep swapping its value to its home while the value is in range and the home doesn't already hold it. Afterwards scan for the first index i with nums[i] ≠ i+1.

## Why it works
Every swap puts at least one value permanently in its home, so there are at most n swaps overall (amortised O(n)). The `nums[v-1] !== v` check stops infinite loops on duplicates.

## Edge cases
- Duplicates, negatives, zero, and huge values (all ignored).
- Array already containing 1..n → answer n+1.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random arrays compared with a Set-based brute force, plus a 10⁵ reversed permutation.

## Reusable pattern
**Cyclic sort / index-as-hash**: when values live in 1..n, the array can store its own presence table (compare 448, 645).
