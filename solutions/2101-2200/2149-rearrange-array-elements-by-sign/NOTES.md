# 2149. Rearrange Array Elements by Sign

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, simulation |
| Link | https://leetcode.com/problems/rearrange-array-elements-by-sign/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Interview Benchmark VI |

## What it asks (own words)
Half the numbers are positive and half negative. Interleave them (positive first) while keeping each sign's original order.

## Approach
Allocate the output and keep two write cursors: the next positive goes to index 0, 2, 4, …; the next negative to 1, 3, 5, …. One pass over the input fills everything.

## Why it works
Because the counts are equal, the positives exactly fill the even slots and the negatives the odd slots; scanning left to right preserves relative order within each sign.

## Edge cases
- No zeros exist (|x| ≥ 1), so `x > 0` vs else is a complete split.

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Testing note
Compared with a filter-then-interleave oracle on random shuffled inputs, plus a 2·10⁵ timing check.

## Reusable pattern
**Stable partition into fixed slots** with independent write pointers.
