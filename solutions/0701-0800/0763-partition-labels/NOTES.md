# 763. Partition Labels

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, two-pointers, string, greedy |
| Link | https://leetcode.com/problems/partition-labels/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Cut a string into as many pieces as possible so that every letter lives in only one piece; return the piece lengths in order.

## Approach
First pass: store the last index of each letter. Second pass: the current piece must reach at least the last occurrence of every letter it contains, so keep `end = max(end, last[s[i]])`. When `i === end`, nothing inside needs to go further — cut there.

## Why it works
Any valid cut must lie at or beyond `end`; cutting exactly at the first such point leaves the most room for later cuts (greedy is optimal).

## Edge cases
- One letter repeated → a single piece.
- All distinct letters → pieces of length 1.

## Complexity
- Time: O(n)
- Space: O(1) (26 counters)

## Testing note
Compared with a brute force that tries all cut masks, keeps those where no letter appears in two pieces, and picks the one with the most pieces.

## Reusable pattern
**"Last occurrence" + expanding window end** — same idea as merge-intervals / jump-game reach.
