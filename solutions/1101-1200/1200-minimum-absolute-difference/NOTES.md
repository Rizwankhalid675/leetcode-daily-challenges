# 1200. Minimum Absolute Difference

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, sorting |
| Link | https://leetcode.com/problems/minimum-absolute-difference/ |
| Context | Quest: DSA / Sorting Plateau / Sorting |

## What it asks (own words)
Among distinct integers, list every pair [a, b] (a < b) whose gap equals the smallest gap in the array, in ascending order.

## Approach
After sorting, any pair that isn't adjacent has some element between it, so its gap is at least an adjacent gap. So compute the minimum adjacent difference, then collect the adjacent pairs that hit it; they come out already ordered.

## Edge cases
- Negative values: the comparator must be numeric (`a - b`), not the default string sort.

## Complexity
- Time: O(n log n)
- Space: O(1) extra (besides the output and sort)

## Testing note
Compared with an all-pairs brute force on random distinct values.

## Reusable pattern
**Sort, then only neighbours matter** for closest-pair questions in 1-D.
