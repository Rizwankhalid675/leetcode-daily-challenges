# 1964. Find the Longest Valid Obstacle Course at Each Position

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, binary-search, binary-indexed-tree, longest-increasing-subsequence |
| Link | https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
For every position i, report the length of the longest non-decreasing subsequence that ends exactly at i (and must include obstacle i).

## Key constraints
- n up to 10⁵: needs O(n log n).

## Approach
Patience sorting for the non-decreasing variant. `tails[k]` is the smallest ending height of a non-decreasing run of length k+1 seen so far. For height h, find the first tail **strictly greater** than h (upper bound); h can extend every run whose tail is ≤ h, so the run ending at i has length `pos + 1`. Then write h at that position.

## Why it works
Everything before `pos` has a tail ≤ h, so the longest run h can extend has length `pos`; nothing at `pos` or later can be extended because its smallest tail already exceeds h. Using upper bound (instead of lower bound as in strict LIS) is what lets equal heights chain.

## Edge cases
- Equal heights: they chain, so all-equal input gives 1, 2, 3, ….
- Decreasing input: every answer is 1.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared with full subsequence enumeration on tiny arrays and with the O(n²) DP on arrays up to 300; plus 10⁵-size timing and all-equal checks.

## Reusable pattern
**LIS tails with lower bound = strictly increasing; with upper bound = non-decreasing.** The insertion position is the per-index answer.
