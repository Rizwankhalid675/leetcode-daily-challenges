# 731. My Calendar II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, design, segment-tree, prefix-sum, ordered-set |
| Link | https://leetcode.com/problems/my-calendar-ii/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Segment Tree |

## What it asks (own words)
Accept half-open bookings [start, end) one by one, rejecting any that would make some moment covered three times.

## Key constraints
Times up to 10^9 (too big for a plain array), at most 1000 bookings.

## Approach
A segment tree over the integer points 0..10^9-1 whose nodes are created only when a range update needs to split them.
- Each node keeps `maxv` (the highest coverage inside its range) and `lazy` (an add that applies to its whole range and is never pushed down).
- A query returns `lazy + max(child answers)`, so pending adds are accounted for on the way back up.
- `book(s, e)`: query the max coverage on [s, e-1]; if it is already 2, reject; otherwise add 1 to that range.

With only 1000 bookings, keeping lists of bookings and double-booked overlaps (O(n) per call) also passes; the segment tree scales to many more calls.

## Why it works
A booking causes a triple booking exactly when some point in its range is already covered twice, i.e. when the range max is at least 2.

## Edge cases
- Half-open intervals: [5, 10) and [10, 20) do not overlap, handled by using the closed point range [s, e-1].
- Rejected bookings change nothing.

## Complexity
- Time: O(log C) per booking, C = 10^9 (about 30 levels)
- Space: O(k log C) nodes for k bookings

## Testing note
Random bookings on a 40-point line compared with a per-point coverage counter; boundary checks at 0 and 10^9; timing check.

## Reusable pattern
**Dynamic segment tree with non-propagated lazy (max + range add)** for huge coordinate ranges with few updates.
