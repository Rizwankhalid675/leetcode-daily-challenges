# 1191. K-Concatenation Maximum Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/k-concatenation-maximum-sum/ |
| Context | Quest: DSA / Strategy Summit / 2D Dynamic Programming |

## What it asks (own words)
Repeat an array k times and find the largest subarray sum (the empty subarray counts as 0), reported modulo 1e9+7.

## Key constraints
- n, k up to 1e5 and |arr[i]| ≤ 1e4: the answer can reach about 1e14, so it has to be computed exactly before taking the modulus. 1e14 < 2^53, so plain doubles are exact.

## Approach
1. k = 1: ordinary Kadane with a floor of 0.
2. k ≥ 2: run Kadane over **two** copies. That covers every subarray that sits inside one copy or crosses one boundary (a suffix of one copy followed by a prefix of the next).
3. If the whole-array total is positive, the best subarray should stretch from a suffix of the first copy to a prefix of the last one, taking the k − 2 middle copies whole. So add (k − 2) · total to the two-copy answer.
4. Take the result mod 1e9+7 once, at the end.

## Why it works
- If total ≤ 0, a subarray covering a full copy can drop that copy without getting worse, so the optimum spans at most two copies.
- If total > 0, the two-copy optimum is max(suffix + prefix, best inside one copy). With total > 0 the best suffix + prefix is at least as good as any in-copy subarray, because an in-copy subarray [l, r] satisfies suffix(l) + prefix(r) ≥ sum(l..r) + total. So the two-copy answer is exactly suffix + prefix, and inserting the middle copies adds (k − 2) · total.

## Edge cases
- All negative: 0 (empty subarray).
- Taking the modulus at each step would break the max comparisons. It is safe to skip because the true value fits exactly in a double.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with Kadane over the literally concatenated array on random small inputs (k up to 6, which covers k = 1, 2 and the middle-copies case), plus a max-size case checked with BigInt.

## Reusable pattern
**Periodic arrays: solve on two periods, then add whole periods analytically** when a period's total is positive.
