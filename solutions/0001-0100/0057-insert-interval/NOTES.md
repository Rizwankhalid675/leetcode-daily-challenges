# 57. Insert Interval

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array |
| Link | https://leetcode.com/problems/insert-interval/ |
| Study plan | Top Interview 150 (Intervals) |

## What it asks (own words)
Given sorted, disjoint intervals and one new interval, insert it and merge wherever needed, keeping the list sorted and
disjoint.

## Key constraints
- Up to 10⁴ intervals, already sorted, so O(n) is possible without re-sorting.

## Approach
Three phases:
1. Copy intervals that end before the new one starts (`end < start`).
2. Merge every interval that starts at or before the (growing) new end, extending start with `min` and end with `max`.
3. Push the merged interval, then copy the rest.

## Why it works
Because the input is sorted and disjoint, the intervals that overlap the new one form one contiguous block. Phase 2
consumes exactly that block.

## Edge cases
- An empty list.
- The new interval entirely before or after everything.
- Touching endpoints count as overlapping ("share at least one point").

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Testing note
Compared against the 56 (Merge Intervals) solution applied to `intervals + newInterval`, on 1000 random cases. That's
a clean independent oracle.

## Reusable pattern
**Sorted disjoint intervals: before / overlapping / after, in three linear phases.**
