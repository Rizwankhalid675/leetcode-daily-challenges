# 2488. Count Subarrays With Median K

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table, prefix-sum |
| Link | https://leetcode.com/problems/count-subarrays-with-median-k/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Interview Benchmark VI |

## What it asks (own words)
In a permutation of 1..n, count the contiguous subarrays whose (lower) median is exactly k.

## Key constraints
- n up to 10⁵ → need O(n); values are distinct, so k appears exactly once.

## Approach
1. The subarray must contain k's position p.
2. Replace every other value by +1 if it is greater than k and −1 if smaller. With `g` greater and `s` smaller elements, k is the lower median iff `g − s ∈ {0, 1}` (odd length: equal; even length: one more above).
3. Walk left from p, recording how often each left balance (sum over nums[i..p−1], including the empty 0) occurs.
4. Walk right from p with running balance b over nums[p+1..j]; each left balance L pairs with it iff `L + b ∈ {0, 1}`, so add `cnt[−b] + cnt[1 − b]`.

Balances lie in [−n, n], so a typed array with an offset replaces a hash map.

## Why it works
Sorting a subarray containing k puts k at index s (the number of smaller elements); the lower median index is ⌊(len−1)/2⌋ = ⌊(g+s)/2⌋, which equals s exactly when g = s or g = s + 1.

## Edge cases
- k at either end → one side contributes only the empty balance.
- Single-element array → 1.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with sort-each-subarray brute force on 1000 random permutations (n ≤ 10), plus hand checks and a 10⁵ timing test.

## Reusable pattern
**Median = balance condition**: map to ±1 relative to the pivot and count prefix-balance pairs meeting at the pivot.
