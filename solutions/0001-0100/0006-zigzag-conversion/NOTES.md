# 6. Zigzag Conversion

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string |
| Link | https://leetcode.com/problems/zigzag-conversion/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Write the string down and up across numRows rows in a zigzag, then read it row by row.

## Key constraints
- Length ≤ 1000, numRows ≤ 1000.

## Approach
Simulate the writing. Keep one bucket per row and a current row that moves +1 or −1, flipping direction at the top and
bottom rows. At the end, concatenate the rows.

## Why it works
It literally reproduces the zigzag placement. Every character goes to exactly one row, in reading order within that
row.

## Edge cases
- numRows = 1 → unchanged (the direction would never flip, and `row` would run off the array).
- numRows ≥ length → unchanged (every character gets its own row).

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
Direct index arithmetic. The pattern repeats every `2·(numRows − 1)` characters: row r takes positions ≡ r and
≡ cycle − r (mod cycle). This is the test reference.

## Reusable pattern
**Simulate with a bouncing index,** or find the period and compute positions directly.
