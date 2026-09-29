# 120. Triangle

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/triangle/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Walk from the top of a number triangle to the bottom, stepping to one of the two adjacent entries in the next row each time. Minimize the sum.

## Approach
Work upward. Copy the last row into `dp`. For each row from the second-to-last up to the top, overwrite `dp[c] = row[c] + min(dp[c], dp[c+1])`. Reading `dp[c]` and `dp[c+1]` before writing `dp[c]` is safe when `c` goes left to right, because `dp[c+1]` hasn't been overwritten yet. The top ends up in `dp[0]`.

## Edge cases
- One row: just that value.
- Negative numbers: fine, since the min is taken over complete paths.

## Complexity
- Time: O(n²) (every entry once)
- Space: O(n) (the follow-up asks for this)

## Testing note
Compared with an exhaustive recursive search over all paths on random triangles; also checks the input isn't modified.

## Reusable pattern
**Bottom-up DP removes the "which end" question**: the top has one start, so fold upward into it.
