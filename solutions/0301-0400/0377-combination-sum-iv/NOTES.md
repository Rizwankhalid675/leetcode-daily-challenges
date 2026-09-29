# 377. Combination Sum IV

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/combination-sum-iv/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Count the ordered sequences of numbers from a set (reuse allowed) that sum to the target. Despite the name, different orders count separately.

## Key constraints
- Up to 200 distinct positive numbers, target ≤ 1000.
- Only the final answer is promised to fit in 32 bits.

## Approach
`dp[t]` = number of sequences summing to t. The last element can be any x ≤ t, leaving a sequence for t − x: `dp[t] = Σ dp[t − x]`, with `dp[0] = 1`. The target is the outer loop, which is what makes order matter.

## Overflow note
Intermediate dp values can exceed 2⁵³ (C++/Java solutions overflow there too). Every dp value that contributes to `dp[target]` is a non-negative summand of it, so it is ≤ the answer < 2³¹ and exact; the inexact ones never reach the answer. The largest possible value (all of 1..1000 up to 1000) is about 2⁹⁹⁹, still finite as a double, and only additions are done, so no NaN.

## Edge cases
- Target smaller than every number: 0.

## Complexity
- Time: O(target · |nums|)
- Space: O(target)

## Testing note
Compared with plain recursive enumeration on small inputs and with a BigInt DP on large random inputs whose answer fits in 32 bits, including a crafted case with intermediates above 2⁵³.

## Follow-up (negative numbers)
With negative numbers, sequences can grow forever while keeping the same sum (e.g. 1 and −1), so the count is infinite unless the sequence length is bounded.

## Reusable pattern
**Target in the outer loop counts permutations; items in the outer loop count combinations** (compare 518).
