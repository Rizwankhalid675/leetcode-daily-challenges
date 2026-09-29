# 39. Combination Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, backtracking |
| Link | https://leetcode.com/problems/combination-sum/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
From distinct positive candidates (each usable any number of times), list every multiset whose sum equals the target.

## Approach
Sort the candidates and backtrack with a `start` index:
- At each step try candidates from `start` onward, recursing with the **same** index (so a number may repeat).
- Never going back to earlier indices means each multiset is built once, in non-decreasing order, so no duplicates.
- Because the list is sorted, the loop stops at the first candidate larger than the remainder.

## Edge cases
- No combination (e.g. `[2]`, target 1): empty result.
- The input array is copied before sorting so the caller's array isn't reordered.

## Complexity
- Time: exponential in target / min(candidate); bounded by the promised < 150 combinations times their length, plus pruned dead ends
- Space: O(target / min(candidate)) recursion depth (≤ 20 for target ≤ 40)

## Testing note
The number of distinct multisets is computed independently with the coin-change "number of ways" DP. Each result is also checked to sum to the target, use only candidates, and be unique.

## Reusable pattern
**Start-index backtracking** generates combinations (not permutations); reuse the same index to allow repeats.
