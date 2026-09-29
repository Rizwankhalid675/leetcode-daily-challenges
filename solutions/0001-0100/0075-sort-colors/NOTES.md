# 75. Sort Colors

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, sorting, quicksort, bubble-sort |
| Link | https://leetcode.com/problems/sort-colors/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Sort an array of 0s, 1s and 2s in place without a library sort, ideally in one pass.

## Approach
Maintain regions: `[0, lo)` are 0s, `[lo, mid)` are 1s, `(hi, end]` are 2s, `[mid, hi]` unknown. Look at `nums[mid]`:
- 0 → swap into the `lo` slot, advance both `lo` and `mid`.
- 2 → swap with `hi`, shrink `hi` (don't advance `mid`: the swapped-in value is unexamined).
- 1 → just advance `mid`.

## Edge cases
- All one colour; a single element.

## Complexity
- Time: O(n), one pass
- Space: O(1)

## Testing note
Returns nothing, so tests mutate a copy and compare it with a numeric sort over random arrays.

## Reusable pattern
**Three-way partition (Dutch flag)** — also the core of 3-way quicksort.
