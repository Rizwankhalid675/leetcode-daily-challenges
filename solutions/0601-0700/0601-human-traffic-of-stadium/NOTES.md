# 601. Human Traffic of Stadium

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/human-traffic-of-stadium/ |
| Context | Quest: Database / SQL Advanced Operation Center / SQL II |

## What it asks (own words)
Return every row that belongs to a streak of at least three consecutive ids where each row had 100 or more people.

## Approach
1. Keep only the busy rows (`people >= 100`).
2. Number them with `ROW_NUMBER()` by id. Inside a streak of consecutive ids, id and row number both go up by 1, so `id - row_number` stays constant; any gap in ids changes it. That difference labels the streak.
3. Count rows per label with a window `COUNT(*)` and keep labels with at least 3 rows.

## Why it works
If busy ids a < b are in the same streak, every id between them is busy, so the row number grows exactly as fast as the id. If some id between them is missing or not busy, the id jumps by more than the row number, so the labels differ.

## Edge cases
- Streaks are defined by consecutive **ids**, not dates (row 8 in the example is included even though a date is skipped).
- A streak of length 4+ is returned in full.
- `ROW_NUMBER()` is BIGINT UNSIGNED in MySQL; it's cast to SIGNED so the subtraction can never hit an unsigned-overflow error.
- Output sorted by `visit_date`.

## Reusable pattern
**Gaps and islands: `key - ROW_NUMBER() OVER (ORDER BY key)`** labels runs of consecutive keys; then window-count or group by that label.
