# 1035. Uncrossed Lines

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, longest-common-subsequence |
| Link | https://leetcode.com/problems/uncrossed-lines/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Draw lines between equal numbers of two rows. Lines may not cross or share an endpoint. Maximize the number of lines.

## Approach
If lines don't cross, their endpoints are increasing in both arrays, so the connected values form a common subsequence. Conversely any common subsequence can be drawn without crossings. So the answer is the LCS length: match the last elements if equal (diagonal + 1), otherwise drop one of them. Two rolling rows.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Testing note
The oracle does not assume the LCS reduction: it searches over sets of equal-value edges and keeps only pairwise non-crossing, endpoint-disjoint sets (arrays up to length 7 over a 3-letter alphabet).

## Reusable pattern
**Recognize LCS in disguise**: non-crossing matchings between two sequences are common subsequences.
