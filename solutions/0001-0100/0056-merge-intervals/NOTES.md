# 56. Merge Intervals

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, sorting |
| Link | https://leetcode.com/problems/merge-intervals/ |
| Study plan | Top Interview 150 (Intervals) |

## What it asks (own words)
Merge all overlapping (or touching) intervals and return the resulting disjoint intervals.

## Key constraints
- Up to 10⁴ intervals.

## Approach
Sort by start. Walk through: if an interval starts at or before the last merged interval's end, extend that end with
`max`. Otherwise start a new merged interval.

## Why it works
After sorting, anything that overlaps the current merged block must come next, before any interval that starts after
the block's end. `max` handles intervals fully contained in the block.

## Edge cases
- Touching endpoints merge ([1,4] + [4,5]).
- Containment ([1,10] + [2,3]).
- Unsorted input.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
The reference "paints" covered points at half-integer resolution, so that touching and gaps are distinguished. It then
reads the runs back, which is a different algorithm with no sorting of intervals.

## Reusable pattern
**Sort by start + sweep with a running end.** It's the basis of 57 (insert interval), 452 and 435.
