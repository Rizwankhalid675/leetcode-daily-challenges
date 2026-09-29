# 1912. Design Movie Rental System

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table, design, heap-priority-queue, ordered-set |
| Link | https://leetcode.com/problems/design-movie-rental-system/ |
| Context | Quest: System & Software Design / Business System Simulation Platform / Assignment (quiz) |

## What it asks (own words)
Shops hold at most one copy of each movie at a fixed price. Support renting and returning a copy, listing the 5 cheapest shops that currently have a movie available (ties by shop number), and listing the 5 cheapest copies currently rented out (ties by shop, then movie).

## Key constraints
- Up to 10⁵ entries and 10⁵ operations; shops < 3·10⁵, movies and prices ≤ 10⁴.
- A single movie can have up to 10⁵ copies, so sorting or scanning per query is too slow in the worst case.

## Approach: heaps with lazy deletion
JS has no sorted set, so each ordering is a **min-heap with lazy deletion**:
- `avail[movie]`: heap of `price · 3e5 + shop` for copies that were unrented when pushed.
- `out`: one heap of `(price · 3e5 + shop) · 10001 + movie` for copies that were rented when pushed.
- `rented`: a Set holding the true current state.

Each packed key is a single number that sorts exactly in the required tie-break order (the largest is about 3·10¹³, well below 2⁵³). Comparisons are plain numeric ones.

`rent` marks the copy and pushes it onto `out`; `drop` unmarks it and pushes it back onto its movie heap. Neither removes the old entry.

A query pops entries until it has 5 answers:
- an entry whose state no longer matches (e.g. a rented copy in an avail heap) is **stale** and is thrown away for good;
- the same key twice in a row is a **duplicate** (e.g. rent → drop → rent before any report cleared the old entry) and the extra copy is thrown away;
- valid entries are collected, then pushed back.

## Why it's fast
Every push is paid for by an operation (entries, rents, drops, or the ≤ 5 re-pushes per query), and every discarded pop removes one of those pushes. So the total work is O((entries + ops) · log) amortized.

## Edge cases
- Searching a movie no shop carries → empty list.
- Fewer than 5 valid results → return what's there.
- Re-renting the same copy repeatedly creates duplicate heap keys; the consecutive-equal check removes them.

## Complexity
- Time: O(E log E) to build (a sorted array is already a heap), amortized O(log E) per rent/drop and O(log E) per search/report beyond the discarded entries
- Space: O(E + operations)

## Testing note
Compared with a brute-force system (filter + sort on every query) under random rent/drop/search/report sequences with many price ties, plus a timing check with 10⁵ entries and 10⁵ operations.

## Reusable pattern
**Lazy-deletion heap as a stand-in for a sorted set**: keep the truth in a hash set, push on every state change, and discard stale or duplicate entries when they reach the top. **Pack a multi-key sort order into one number** when the ranges fit below 2⁵³.
