# 3904. Smallest Stable Index II

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-05 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Prefix Sum |
| Link | https://leetcode.com/problems/smallest-stable-index-ii/ |
| Result | Accepted, 928/928 tests, 15 ms, 78 MB (submission 2156487047) |

## What it asks (own words)
Identical to Part I (3903): the score at *i* is (max of everything up to *i*) − (min of everything from *i* on),
and we want the first index with score ≤ k. But now n can be 10⁵.

## Key constraints
- n ≤ 10⁵ → O(n²) would be about 10¹⁰ operations, far too slow. We need O(n) or O(n log n).

## Reasoning
The Part I bottleneck is recomputing the suffix minimum for every *i*. But `suffixMin[i] = min(nums[i],
suffixMin[i+1])`, a recurrence that can be filled once from right to left. The prefix maximum already had the same
property going left to right. With both available in O(1) per index, one sweep finds the answer.

## Algorithm
1. Build `suffixMin` from right to left.
2. Sweep left to right with a running `prefixMax`; return the first i with `prefixMax − suffixMin[i] ≤ k`.
3. Otherwise return −1.

## Why it works
Each array entry holds exactly the quantity from the definition, so the score is computed exactly at every index,
in order.

## JavaScript implementation details
- `new Array(n)` then filling from the end avoids `unshift` (which is O(n) per call).
- The prefix max stays a scalar, since we only ever need the current value, so it needs no array.

## Edge cases
Same as Part I. The strictly decreasing array of length 10⁵ with k = 0 exercises the "no answer" path at full size
(every score is positive).

## Bugs / debugging
None. It was cross-checked against the Part I O(n²) solution on 2000 random arrays, plus a timing test at n = 10⁵.

## Alternatives considered
- A sparse table / segment tree for range-min queries: O(n log n), unnecessary because every query is a suffix.
- Early exit without the suffix array isn't possible, since the suffix min depends on the future.

## Complexity
- Time: O(n).
- Space: O(n) for `suffixMin`.

## Reusable pattern
**Prefix/suffix precomputation.** When every index needs an aggregate (min/max/sum/product) of "everything to the
left" and/or "everything to the right", build those arrays in one pass each, then answer every index in O(1).

## What to take away personally
When a brute force re-scans a range that shares almost everything with the previous range, look for a recurrence
between neighbours. That turns O(n²) into O(n).
