# 435. Non-overlapping Intervals

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, greedy, sorting |
| Link | https://leetcode.com/problems/non-overlapping-intervals/ |
| Study plan | LeetCode 75 (Intervals) |

## What it asks (own words)
Remove as few intervals as possible so that none of the remaining ones overlap. Touching endpoints are allowed.

## Key constraints
- Up to 10⁵ intervals → O(n log n).

## Approach
Minimizing removals is the same as **maximizing the number kept**, which is the classic activity-selection problem.
Sort by end time; keep an interval whenever it starts at or after the last kept end. Answer: n − kept.

## Why it works
The exchange argument for earliest end: some optimal solution contains the interval that finishes first, because
swapping it in for that solution's first interval never causes a new overlap (it ends no later). Repeat on the
intervals compatible with it.

## Edge cases
- Identical intervals: all but one must go.
- Touching `[1,2]`, `[2,3]` → no removal (`>=`, not `>`).
- Sorting by *start* instead of end is a classic wrong approach: one long early interval can block many short ones.

## Complexity
- Time: O(n log n)
- Space: O(n) for the sorted copy

## Testing note
Compared against a brute force that finds the largest compatible subset over every subset.

## Reusable pattern
**Interval scheduling: sort by end, greedily take what fits.** Compare 452 (arrows), which is the same greedy where
touching counts as overlapping.
