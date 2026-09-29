# 131. Palindrome Partitioning

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming, backtracking |
| Link | https://leetcode.com/problems/palindrome-partitioning/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Cut a string into pieces that are all palindromes; list every such way of cutting.

## Key constraints
- Length ≤ 16, so there are at most 2¹⁵ cuttings; exponential output is expected.

## Approach
1. Interval DP: `pal[i][j]` is true when the ends match and the inside (`i+1..j−1`) is a palindrome (or has length < 2). Fill i from right to left.
2. Backtrack from position `start`: for each `end` where `pal[start][end]` holds, take that piece and recurse from `end + 1`.

## Edge cases
- Single character: one partition.
- All same letter: every cutting works (2ⁿ⁻¹ results).

## Complexity
- Time: O(n · 2ⁿ) worst case (output size), O(n²) for the table
- Space: O(n²) for the table plus the output

## Testing note
Compared with a brute force that tries all 2ⁿ⁻¹ cut masks and keeps those whose pieces are all palindromes.

## Reusable pattern
**Precompute an O(1) validity table, then backtrack** — avoids re-checking substrings.
