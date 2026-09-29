# 896. Monotonic Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array |
| Link | https://leetcode.com/problems/monotonic-array/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Is the array entirely non-decreasing or entirely non-increasing?

## Approach
Scan adjacent pairs, remembering whether we've seen a strict rise and a strict fall. Seeing both means it's not monotonic; equal neighbours don't count as either.

## Edge cases
- Length 1 or all equal → true.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with checking both directions separately on random short arrays with many ties.

## Reusable pattern
**Direction flags** in a single pass.
