# 347. Top K Frequent Elements

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, divide-and-conquer, sorting, heap-priority-queue, bucket-sort, counting, quickselect |
| Link | https://leetcode.com/problems/top-k-frequent-elements/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Ascension III |

## What it asks (own words)
Return the k values that occur most often (the answer set is guaranteed unique; any order).

## Key constraints
- n up to 10⁵; follow-up asks for better than O(n log n).

## Approach: bucket sort by frequency
1. Count occurrences in a Map.
2. A frequency is between 1 and n, so put each value into `buckets[freq]`.
3. Walk frequencies from n down to 1, collecting values until k are taken.

## Why it works
Buckets visited in decreasing frequency hand out values in non-increasing count order; the uniqueness guarantee means ties never straddle the k-th position, so stopping at k is exact.

## Edge cases
- k equals the number of distinct values → return all of them.
- Negative numbers are fine as Map keys.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared (as sorted sets) with a sort-by-count oracle on random arrays, keeping only cases where the answer is unique.

## Reusable pattern
**Bucket sort when the key range is bounded by n** (frequencies are always ≤ n).
