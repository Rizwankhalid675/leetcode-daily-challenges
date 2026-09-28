# 3414. Maximum Score of Non-overlapping Intervals

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-12 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | Array, Binary Search, Dynamic Programming, Sorting |
| Link | https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals/ |
| Result | Accepted, 581/581 tests, 561 ms, 133.8 MB (submission 2156488844) |

## What it asks (own words)
Choose at most 4 intervals that don't touch or overlap (sharing an endpoint counts as touching) to maximize the
total weight. Among all maximum-weight choices, return the one whose **sorted list of original indices** is
lexicographically smallest.

## Key constraints
- n up to 5·10⁴, so O(n²) is too slow and we need about O(n log n).
- Coordinates and weights up to 10⁹; a sum of 4 weights ≤ 4·10⁹ fits comfortably in a JS number.
- "At most 4": the count dimension is tiny.

## Reasoning
Without the tie-break this is **weighted interval scheduling** with a cardinality limit:
- Sort by start. At sorted position p, either **skip** it or **take** it and jump to the first position whose start
  is strictly greater than its end (binary search).
- Add a dimension for "how many more intervals we may take" (k ≤ 4).

`best(k, p) = max( best(k, p+1),  w[p] + best(k−1, next[p]) )`.

The twist is the tie-break. Each DP cell stores not just the best score but the lexicographically smallest sorted
index list achieving it, and ties are resolved by comparing lists.

**Is that safe?** A DP that keeps only one representative per cell is valid only if "combine with the best
sub-answer" gives the best combined answer. Taking interval `i` means inserting index `i` into the sub-answer's
sorted list. I checked that inserting the same value into two tied lists preserves their lexicographic order. The
one case where it could flip is when one list is a prefix of the other, but two tied lists can't be in that
relation: a strict superset has extra positive weight, so it would have a strictly larger score.

## Algorithm
1. `order` = indices sorted by start; `starts` = their start values.
2. `next[p]` = first sorted position with `start > end(order[p])` (upper-bound binary search).
3. For k = 1..4, p = n−1..0: compare skip vs take (score first, then `lexLess`); store score and list.
4. Answer: the list at `(k = 4, p = 0)`.

## Why it works
Any valid selection, sorted by start, has each interval starting after the previous one ends. So "take p, then
continue from next[p]" enumerates exactly the valid selections whose first interval is p. The skip/take recursion
covers all selections of size ≤ k, and the tie-break argument above ensures the stored representative is the
global lexicographic minimum among maximum-score selections.

## JavaScript implementation details
- `(lo + hi) >> 1` for the midpoint (safe since n is far below 2³¹).
- `Array.from({ length: n }, (_, i) => i).sort(...)` builds an index permutation without mutating the input.
- `new Array(n + 1).fill(null).map(() => [])` creates **distinct** empty arrays. `fill([])` would share one array
  across all cells, a classic JS aliasing pitfall.
- Stored lists are never mutated after creation (`withIndex` copies), so sharing references between the skip branch
  and the stored cell is safe.

## Edge cases
- Touching endpoints ([1,2] and [2,3]) are overlapping, hence the strict `>` in the binary search.
- A tie between one heavy interval and two light ones: `[0,1]` beats `[2]`.
- More than 4 disjoint intervals: only 4 may be taken.

## Bugs / debugging
None on submission. It was verified against an exhaustive search over all subsets of size ≤ 4, on 600 random
inputs with small weights (to force many ties), plus a 5·10⁴ timing test.

## Optimization opportunity
561 ms / 134 MB is on the heavy side: allocating a new list and calling `sort` for each "take" creates many small
arrays. Improvements would be to insert the index into the ≤3-element list by a linear shift instead of `sort`,
and to compare scores before building the list. The skip branch already avoids allocation.

## Alternatives considered
- Sort by end and use a DP over "last chosen interval". This is equivalent, but the lexicographic tie-break is
  more natural with the start-sorted forward recursion.
- Brute force over subsets: O(n⁴), only usable as a test oracle.

## Complexity
- Time: O(n log n) for sorting and binary searches, plus O(4n) DP transitions (each O(1) for ≤4-element lists).
- Space: O(4n) cells, each holding a list of ≤ 4 indices.

## Reusable pattern
**Weighted interval scheduling = sort + binary search for the next compatible item + skip/take DP.** A small
cardinality limit adds one tiny dimension. A tie-break rule can ride along in the DP value if you verify it composes
monotonically.

## What to take away personally
Before storing "one best answer per state", ask whether ties can be broken locally. Here it works, but only because
of a specific argument, and the brute-force comparison with deliberately tie-heavy inputs is what gives confidence.
