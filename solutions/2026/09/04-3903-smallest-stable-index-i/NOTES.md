# 3903. Smallest Stable Index I

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-04 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | Array, Prefix Sum |
| Link | https://leetcode.com/problems/smallest-stable-index-i/ |
| Result | Accepted, 941/941 tests, 1 ms, 57.5 MB (submission 2156486989) |

## What it asks (own words)
For each position *i*, take the largest value at or before *i* and subtract the smallest value at or after *i*.
Return the first position where this difference is at most *k*, or −1 if none.

## Key constraints
- n ≤ 100 → an O(n²) scan is fine (10⁴ operations).
- Values and k up to 10⁹: differences stay far below 2⁵³, so plain JS numbers are exact.

## Reasoning
Just compute the definition. The prefix max can be carried forward as we go (it only grows). For the suffix min,
this version simply rescans the rest of the array for each *i*. That's the honest brute force for the small
constraint, and it becomes the reference oracle for Part II.

## Algorithm
For i = 0..n−1: update `prefixMax`; scan j = i..n−1 for `suffixMin`; if `prefixMax − suffixMin ≤ k`, return i.
Return −1.

## Why it works
It evaluates the score exactly as defined, in index order, so the first hit is the smallest stable index.

## JavaScript implementation details
- `-Infinity` / `Infinity` as identity values for max / min.

## Edge cases
- Single element: the score is x − x = 0, which is always ≤ k, so the answer is 0.
- A score exactly equal to k counts (≤, not <).
- Sorted ascending input: index 0 has score `nums[0] − nums[0] = 0`.

## Bugs / debugging
None.

## Alternatives considered
The O(n) prefix/suffix version (see Part II). It's overkill here but strictly better.

## Complexity
- Time: O(n²).
- Space: O(1).

## Reusable pattern
**Matching the algorithm to the constraint.** With n ≤ 100, the direct definition is correct and fast. Keeping
it gives a trustworthy oracle for testing the optimized Part II.

## What to take away personally
LeetCode "I / II" pairs often share a statement and differ only in n. Read the constraints first; they tell you
which version you're writing.
