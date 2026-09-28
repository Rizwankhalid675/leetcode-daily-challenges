# 452. Minimum Number of Arrows to Burst Balloons

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, greedy, sorting |
| Link | https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/ |
| Study plan | LeetCode 75 (Intervals) |

## What it asks (own words)
Each balloon spans an x-interval (inclusive). A vertical arrow at x bursts every balloon covering x. What's the fewest
arrows that burst them all?

## Key constraints
- Up to 10⁵ balloons, with coordinates across the full 32-bit range.

## Approach
Sort by right edge. Walk the balloons: if a balloon starts after the last arrow's position, fire a new arrow at *its*
right edge.

## Why it works
The balloon with the smallest right edge must be hit by some arrow at or before that edge. Moving that arrow right, to
exactly the edge, keeps it hitting that balloon and can only hit more of the others. Every balloon starting at or
before that x is burst. Repeat for the first balloon not yet burst.

## JavaScript note
The comparator `a[1] − b[1]` is safe because JS numbers are doubles: (2³¹ − 1) − (−2³¹) = 2³² − 1 is exact. In Java
or C++ the same subtraction **overflows 32-bit ints**, a well-known bug for this problem, so there you'd use
`Integer.compare`.

## Edge cases
- Balloons touching at a point share an arrow (`start > arrowX` to fire a new one, not `>=`). Compare 435, where
  touching is allowed and the comparison flips.
- The full-range coordinates are tested.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared against an exhaustive minimum-hitting-set search over the candidate x positions (the endpoints).

## Reusable pattern
**Greedy on sorted right edges** (interval stabbing). It's the dual of activity selection.
