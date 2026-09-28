# 15. 3Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, sorting |
| Link | https://leetcode.com/problems/3sum/ |
| Study plan | Top Interview 150 (Two Pointers) |

## What it asks (own words)
List every distinct triple of values (from three different positions) that sums to zero.

## Key constraints
- n ≤ 3000, so O(n²) is intended and O(n³) is too slow.

## Approach
1. Sort a copy.
2. For each index i as the smallest element (stopping once `a[i] > 0`, since three positives can't sum to 0), run
   two pointers on `i+1..n−1` looking for `−a[i]` (the 167 technique).
3. **Deduplicate:** skip i if `a[i] === a[i−1]`. After a match, skip runs of equal values on both pointers.

## Why it works
Every zero-sum triple, written in sorted order, has a unique smallest element. It's found when i is that element's
first occurrence, and its remaining pair is found by the converging pointers. The skipping rules make each distinct
value triple appear exactly once.

## Edge cases
- All zeros → a single [0,0,0].
- Many duplicates (the random tests use values in −4..4 to force them).

## Complexity
- Time: O(n²)
- Space: O(n) for the sorted copy (or O(log n) if sorting in place)

## Testing note
Compared against an O(n³) brute force that deduplicates through a Set of sorted triples, on 1000 duplicate-heavy random
arrays.

## Reusable pattern
**k-Sum = sort + fix (k − 2) elements + two pointers,** with duplicate skipping at every level.
