# 976. Largest Perimeter Triangle

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math, greedy, sorting, quicksort, polygons |
| Link | https://leetcode.com/problems/largest-perimeter-triangle/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Pick three lengths that form a triangle with non-zero area and maximum perimeter; return 0 if impossible.

## Approach
Sort descending. For a fixed largest side `a[i]`, the best partners are the next two largest `a[i+1], a[i+2]` — if even they can't beat `a[i]`, no smaller pair can. So the first index where `a[i] < a[i+1] + a[i+2]` gives the answer.

## Edge cases
- Degenerate triangle (equality) doesn't count → strict `<`.
- Must use a numeric comparator (`[9,10,100]` would string-sort wrong).

## Complexity
- Time: O(n log n)
- Space: O(n) for the sorted copy

## Testing note
Compared with checking every triple on random small arrays; one case specifically catches string sorting.

## Reusable pattern
**Sort, then greedily test adjacent candidates** (triangle inequality).
