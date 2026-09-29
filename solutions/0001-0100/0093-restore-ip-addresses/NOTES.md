# 93. Restore IP Addresses

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, backtracking |
| Link | https://leetcode.com/problems/restore-ip-addresses/ |
| Context | Quest: DSA / Recursion Maze / Backtracking |

## What it asks (own words)
Insert three dots into a digit string so it becomes a valid IPv4 address (four numbers 0-255 with no leading zeros). Return every possibility.

## Key constraints
- Length 1 to 20, digits only. Any valid answer uses at most 12 digits.

## Approach
DFS over segments. At each step try 1, 2 or 3 digits; stop trying longer segments once one starts with '0' or exceeds 255. Before branching, prune if the remaining digits can't fill the remaining segments (fewer than 1 each or more than 3 each).

## Edge cases
- "0000" gives only "0.0.0.0".
- Length below 4 or above 12 gives nothing (the length pruning handles it immediately).
- "0" alone is a valid segment, "01" is not.

## Complexity
- Time: O(3^4) branches, i.e. constant
- Space: O(1) apart from the output

## Testing note
Compared with a triple loop over all dot positions on random strings drawn from 0/1/2/5 (to hit leading zeros and the 255 boundary). Output order is free, so both sides are sorted.

## Reusable pattern
**Fixed-count partition backtracking with min/max length pruning.**
