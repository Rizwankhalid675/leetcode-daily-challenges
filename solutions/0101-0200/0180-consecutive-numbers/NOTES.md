# 180. Consecutive Numbers

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/consecutive-numbers/ |
| Context | Quest: Database / Window Functions & Ranking Analysis Room / Window Functions & Ranking |

## What it asks (own words)
Which numbers show up at least three times in a row (by id)?

## Approach
Line up each row with the rows at `id + 1` and `id + 2`; if all three have the same `num`, that number qualifies. `DISTINCT` because a run of length 4+ produces several matches for the same number.

## Edge cases
- Runs longer than 3 and multiple separate runs of the same number yield duplicate matches, which `DISTINCT` removes.
- `id` is an auto-increment starting from 1, so "consecutive rows" and "consecutive ids" are the same thing. This follows the id arithmetic of LeetCode's reference approach. (A `LAG(num, 1)`/`LAG(num, 2)` window version is the alternative when ids may have gaps.)

## Reusable pattern
**Fixed-length "k in a row": self-join on `id + 1 ... id + (k-1)`**, or `LAG`/`LEAD` windows. For arbitrary run lengths use gaps-and-islands (`id - ROW_NUMBER()`).
