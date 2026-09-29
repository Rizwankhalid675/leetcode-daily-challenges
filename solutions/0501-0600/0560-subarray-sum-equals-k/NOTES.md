# 560. Subarray Sum Equals K

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, prefix-sum |
| Link | https://leetcode.com/problems/subarray-sum-equals-k/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Challenge II |

## What it asks (own words)
Count the contiguous subarrays whose elements add up to exactly k. Values can be negative.

## Key constraints
- Up to 2 * 10^4 values in [-1000, 1000]. Negative values rule out a sliding window.

## Approach
Keep a running prefix sum. The subarray (i, j] sums to k when `prefix[j] - prefix[i] = k`. So for each position, add how many earlier prefixes equal `prefix - k`, then record the current prefix. Seeding the map with {0: 1} counts subarrays that start at index 0.

## Edge cases
- Zeros and cancelling values create many equal prefixes, so the map stores counts, not just presence.
- k = 0 counts runs whose sum cancels out.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with an O(n^2) brute force on 2000 random arrays with negatives and zeros, plus a max-size timing run.

## Reusable pattern
**Prefix sum + hash map of counts**: turns "subarray with sum k" into "pair of prefixes with difference k" (compare 974, 523).
