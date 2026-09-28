# 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-17 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Hash Table, Binary Search, Dynamic Programming, Sliding Window |
| Link | https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/ |
| Result | Accepted, 65/65 tests, 13 ms, 65.3 MB (submission 2156489733) |

## What it asks (own words)
Find two disjoint contiguous pieces of the array that each add up to `target`, minimizing their combined length.
Return that minimum, or −1 if two such pieces don't exist.

## Key constraints
- n ≤ 10⁵ → we need O(n) or O(n log n).
- **All values are positive (≥ 1).** This is what makes a sliding window valid: extending the window only increases
  the sum, and shrinking only decreases it.

## Reasoning
Two sub-problems:
1. **Find every subarray with sum = target.** With positive values, for each right end there is at most one left end
   that works, and it only moves right as the right end moves right. That's the classic two-pointer window.
2. **Pair them optimally without overlap.** Sweep left to right. When a window `[left..right]` hits the target, the
   best partner is the *shortest* target-sum subarray that ends **before** `left`. Keep a running array
   `bestEndingBy[i]` = the shortest such subarray ending at or before i, and read `bestEndingBy[left − 1]`.

## Algorithm
For each `right`: add `arr[right]`; while `sum > target`, drop `arr[left++]`.
Start with `best = bestEndingBy[right − 1]`. If `sum === target`: `len = right − left + 1`; if
`bestEndingBy[left − 1]` is finite, update `answer` with it plus `len`; `best = min(best, len)`. Store
`bestEndingBy[right] = best`. Return `answer` or −1.

## Why it works
Every target-sum subarray is visited exactly once, at its right end. For the optimal pair (A before B), when the
sweep reaches B's right end, `bestEndingBy[B.left − 1]` is at most |A|, so the answer is found. It can never pair
overlapping pieces, because it only looks strictly before `left`.

## JavaScript implementation details
- `Infinity` as the "none yet" sentinel works naturally with `Math.min`, and `Infinity + x` stays `Infinity`. The
  code still checks explicitly before adding, for clarity.
- `arr[left++]` removes the element and advances in one expression. It's concise, but read it carefully.

## Edge cases
- Only one qualifying subarray → −1.
- `[1, 1]`, target 1 → two single elements → 2.
- Many overlapping candidates with different lengths: the prefix-best array picks the shortest valid partner.

## Bugs / debugging
None. It was checked against a brute force (enumerate all target-sum subarrays, try all disjoint pairs) on 1000
random arrays.

## Alternatives considered
- Prefix sums + hash map: needed if values could be zero or negative (the sliding window breaks then). Same
  "best-so-far" pairing idea.
- Compute best-from-left and best-from-right arrays separately, then combine. Equivalent, but uses two passes.

## Complexity
- Time: O(n): each index enters and leaves the window once.
- Space: O(n) for `bestEndingBy`.

## Reusable pattern
**"Two non-overlapping X" → sweep with a running best-X-so-far on the left.** It reduces a pair search to a
single pass. Combined here with **sliding window for positive-sum subarrays**.

## What to take away personally
Check the sign constraint first: positive values → sliding window; arbitrary values → prefix sums with a hash map.
