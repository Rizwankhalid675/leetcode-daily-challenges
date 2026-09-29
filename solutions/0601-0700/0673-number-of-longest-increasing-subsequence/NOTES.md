# 673. Number of Longest Increasing Subsequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, binary-indexed-tree, segment-tree, longest-increasing-subsequence |
| Link | https://leetcode.com/problems/number-of-longest-increasing-subsequence/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Count how many strictly increasing subsequences have the maximum possible length.

## Key constraints
- n ≤ 2000, so O(n²) = 4·10⁶ is fine.
- The final count fits in 32 bits.

## Approach
For each i track `len[i]` (longest strictly increasing subsequence ending at i) and `cnt[i]` (how many reach that length). For every earlier j with a smaller value: a longer extension replaces both; an equal-length extension adds `cnt[j]`. Finally sum `cnt` over indices whose `len` equals the global maximum.

## Why it works
Every LIS ending at i has a unique second-to-last index j, so the counts partition cleanly by j and nothing is double-counted.

## Edge cases
- All equal: every single element is an LIS of length 1, so the answer is n.
- Duplicates are distinct subsequences when their indices differ.

## Complexity
- Time: O(n²)
- Space: O(n)

## Testing note
Compared with enumerating every index subset (n ≤ 12, values with many duplicates). Counts that feed the answer are each ≤ the answer, so they stay exact as doubles; counts for shorter lengths never affect the result.

## Reusable pattern
**Pair a DP value with a "number of ways to achieve it" counter**: reset on strict improvement, accumulate on ties.
