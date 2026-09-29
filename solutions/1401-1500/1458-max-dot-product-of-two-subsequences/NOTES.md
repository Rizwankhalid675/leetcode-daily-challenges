# 1458. Max Dot Product of Two Subsequences

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, dynamic-programming, longest-common-subsequence |
| Link | https://leetcode.com/problems/max-dot-product-of-two-subsequences/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Interview Benchmark III |

## What it asks (own words)
Pick a non-empty subsequence from each array, both of the same length, and maximise the sum of pairwise products.

## Key constraints
- Lengths up to 500 → O(m·n) = 2.5·10⁵ cells.
- Values can be negative, so "take nothing" is not allowed and the answer may be negative.

## Approach
Classic two-sequence DP. `best[i][j]` = best dot product using only the first i elements of nums1 and first j of nums2, with at least one pair chosen:
- skip nums1[i−1]: `best[i−1][j]`
- skip nums2[j−1]: `best[i][j−1]`
- pair them: `a·b + max(0, best[i−1][j−1])` (either extend an earlier chain or start fresh here).

Borders are −∞ ("no valid pair yet"). Two rolling rows keep memory O(n).

## Why it works
The `max(0, …)` is what makes non-emptiness work: the pair option always includes the current pair, so every finite state contains at least one pair, and the DP can still start fresh when every earlier chain is negative.

## Edge cases
- All products negative (e.g. [−1,−1] vs [1,1]) → answer is the least negative single product.
- Zeros: a product of 0 is a valid non-empty choice.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Testing note
Compared with brute force over every pair of equal-length subsequences (lengths ≤ 6), plus a 500×500 timing check.

## Reusable pattern
**Non-empty subsequence DP**: use −∞ borders and make the "take" transition start fresh with `max(0, previous)`.
