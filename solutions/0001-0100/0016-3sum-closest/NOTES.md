# 16. 3Sum Closest

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, sorting |
| Link | https://leetcode.com/problems/3sum-closest/ |
| Context | Quest: DSA / Recursion Maze / Two Pointers |

## What it asks (own words)
Pick three numbers from the array whose sum lands as close as possible to a target and return that sum.

## Key constraints
- 3 <= n <= 500, values and target within about ±10^4, so O(n^2) is trivial.

## Approach
Sort a copy. For each first index `i`, run two pointers `lo = i + 1`, `hi = n - 1`. Record the sum if it beats the best distance; move `lo` right when the sum is too small, `hi` left when too big, and stop outright on an exact match.

## Why it works
With the array sorted, the pair (lo, hi) sweep is the classic 2-sum scan: whenever the sum is below target, every pair using the current `lo` with a smaller `hi` is even smaller, so `lo` can be dropped (symmetric for `hi`). No pair that could be closer is ever skipped.

## Edge cases
- Exactly three elements.
- Duplicates: skipping a repeated first value is just a speed-up.
- Exact match returns early.

## Complexity
- Time: O(n^2)
- Space: O(n) for the sorted copy (O(1) extra if sorting in place)

## Testing note
Random arrays compared against an O(n^3) enumeration. Since ties could in principle give two valid sums, the test compares distances to target.

## Reusable pattern
**Sort + fix one + two pointers** turns k-sum style searches from O(n^k) into O(n^(k-1)).
