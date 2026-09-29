# 1027. Longest Arithmetic Subsequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, binary-search, dynamic-programming |
| Link | https://leetcode.com/problems/longest-arithmetic-subsequence/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Find the length of the longest subsequence whose consecutive gaps are all equal.

## Key constraints
- n ≤ 1500 and values in [0, 500], so differences lie in [-500, 500].

## Approach
For each pair j < i, the difference d = nums[i] − nums[j] extends the best sequence ending at j with that same difference by one step. Store `dp[i][d]` as "number of steps" (length − 1) so an untouched entry (0) naturally means "just the element itself". Differences are offset by 500 and the table is one flat `Int16Array` of n·1001 entries (about 3 MB), which is much faster than a Map per index.

## Edge cases
- Any two elements form a sequence, so the answer is at least 2.
- All equal: difference 0, answer n (fits in Int16 since n ≤ 1500).

## Complexity
- Time: O(n²)
- Space: O(n · range) = O(n · 1001)

## Testing note
Compared with enumerating every subsequence of arrays up to length 12; plus the ±500 extremes and a max-size timing check.

## Reusable pattern
**Pairwise DP indexed by (end, difference)**; with a small bounded difference range, use a flat typed array instead of hash maps.
