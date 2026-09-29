# 178. Rank Scores

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/rank-scores/ |
| Context | Quest: Database / Window Functions & Ranking Analysis Room / Window Functions & Ranking |

## What it asks (own words)
Rank scores from highest to lowest; equal scores share a rank and the next distinct score gets the next integer (no skipped ranks).

## Approach
That's exactly `DENSE_RANK()` ordered by `score DESC`. The final `ORDER BY score DESC` gives the required output order.

## Edge cases
- `RANK()` would leave gaps after ties (1, 1, 3), and `ROW_NUMBER()` would split ties; only `DENSE_RANK()` matches the rules.
- `rank` is a reserved word in MySQL 8, so the alias is backtick-quoted.
- Scores are DECIMAL, so equality is exact and ties are detected correctly.

## Reusable pattern
**ROW_NUMBER / RANK / DENSE_RANK**: unique numbering / ties share with gaps / ties share without gaps.
