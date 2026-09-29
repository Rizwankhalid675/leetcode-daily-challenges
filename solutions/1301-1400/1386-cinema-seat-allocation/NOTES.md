# 1386. Cinema Seat Allocation

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, greedy, bit-manipulation |
| Link | https://leetcode.com/problems/cinema-seat-allocation/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Challenge I |

## What it asks (own words)
A cinema has n rows of seats labelled 1 to 10, with aisles after seats 3 and 7. A family of four needs four adjacent seats in one row, and an aisle may only split them 2 + 2. Given the reserved seats, how many families can be seated?

## Key constraints
- n can be up to 10^9, but there are at most 10^4 reservations. Looping over rows is impossible, so only reserved rows are processed.
- Reserved seats are distinct.

## Approach
The only valid 4-seat blocks are 2-5, 4-7 (the middle one, split by both aisles) and 6-9. At most two fit in a row (2-5 and 6-9).
- Store each reserved row as a bitmask of its taken seats in a Map. Seats 1 and 10 are skipped, since no block uses them.
- A row with no mask seats 2 families: `2 * (n - rows.size)`.
- For each masked row: if both side blocks are free, add 2. Otherwise add 1 if any of the three blocks is free.

## Edge cases
- A row where only seats 1/10 are reserved never enters the Map, so it still counts as 2.
- Seats 2 and 9 taken leave only the middle block.
- 2 * 10^9 fits easily in a double.

## Complexity
- Time: O(r), where r is the number of reservations.
- Space: O(r)

## Testing note
Compared with a per-row brute force over all 8 subsets of the three blocks, on 1000 random small cinemas. A timing run uses n = 10^9 with 10^4 reservations.

## Reusable pattern
**Sparse rows + default count**: when most rows are identical, work only on the special ones and add the default for the rest.
