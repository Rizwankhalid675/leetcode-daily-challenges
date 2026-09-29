# 712. Minimum ASCII Delete Sum for Two Strings

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming, longest-common-subsequence |
| Link | https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Delete characters from two strings until they are equal, paying each deleted character's ASCII code. Find the minimum total cost.

## Approach
Whatever survives is a common subsequence, and the cost is everything else. So minimize cost = maximize the ASCII sum of the kept common subsequence. That is LCS with weights: on a match add the character's code to the diagonal, otherwise take the better of dropping one character. Answer = ascii(s1) + ascii(s2) − 2·best. Two rolling rows suffice.

## Edge cases
- No common characters: delete everything.
- Identical strings: 0.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Testing note
Compared with enumerating all subsequences of both strings (length ≤ 8), intersecting them, and taking the heaviest common one.

## Reusable pattern
**"Minimum deletions to make equal" = total minus the best common subsequence**, with the LCS weight matching the cost function.
