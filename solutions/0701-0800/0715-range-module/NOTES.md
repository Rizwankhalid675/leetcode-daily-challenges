# 715. Range Module

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | design, segment-tree, ordered-set |
| Link | https://leetcode.com/problems/range-module/ |
| Context | Quest: System & Software Design / Comprehensive Data Operation Simulation Station / Comprehensive Data Operations Simulation |

## What it asks (own words)
Track a set of real numbers built from half-open ranges [left, right): add a range, remove a range, and ask whether a range is completely covered.

## Key constraints
- Coordinates up to 10⁹ (no array indexed by position), at most 10⁴ operations.

## Approach
Keep a sorted array of disjoint `[l, r)` intervals that also **never touch** (adding [1,3) and then [3,5) stores [1,5)). Then "covered" always means "inside one stored interval". All searches are binary searches for the first interval meeting a monotone condition:

- **add [L, R)**: i = first interval with end ≥ L, j = first with start > R. Intervals i..j−1 overlap or touch the new range. Replace them with one interval from min(L, start_i) to max(R, end_(j−1)) (just [L, R) if the block is empty).
- **remove [L, R)**: i = first with end > L, j = first with start ≥ R. Intervals i..j−1 really overlap. Replace them with the leftover pieces: [start_i, L) if it sticks out on the left, and [R, end_(j−1)) if it sticks out on the right.
- **query [L, R)**: take the last interval starting at or before L and check that it reaches R.

## Why the conditions use ≥ vs >
Add uses the "touching counts" versions (end ≥ L, start > R), so adjacent intervals merge. Remove uses strict overlap (end > L, start ≥ R), so intervals that only touch the removed range are left alone.

## Edge cases
- Removing part of the middle of one interval splits it in two.
- Removing or adding over a gap with no stored intervals.
- Querying a range that crosses a gap → false.

## Complexity
- Time: O(log k) search plus O(k) splice worst case per operation (k = stored intervals ≤ number of adds); fine for 10⁴ operations
- Space: O(k)

## Testing note
Compared with a boolean array over unit cells (integer endpoints, so cell x stands for [x, x+1)) under random add/remove/query, and after every operation the test checks that stored intervals stay sorted and non-touching. Also a 10⁴-operation timing check on coordinates up to 10⁹.

## Reusable pattern
**Sorted non-touching interval list**: add = replace the overlapping block with one merged interval; remove = replace it with at most two trimmed pieces. (Same idea as 352 and 57 Insert Interval.)
