# 4. Median of Two Sorted Arrays

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, binary-search, divide-and-conquer |
| Link | https://leetcode.com/problems/median-of-two-sorted-arrays/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Ascension I |

## What it asks (own words)
Return the median of the union of two sorted arrays without merging them (the target is logarithmic time).

## Key constraints
- One array may be empty (but not both).
- Required O(log(m+n)): a linear merge does not meet the stated bound, even though it would pass.

## Approach: binary search on the partition
Cut the shorter array A at i and the longer B at j = half − i, where half = ⌈(m+n)/2⌉, so the left side always holds half of the elements. The cut is correct when
`A[i−1] ≤ B[j]` and `B[j−1] ≤ A[i]` (missing neighbours are ±∞).
- If `A[i−1] > B[j]`, i is too far right → hi = i − 1.
- If `B[j−1] > A[i]`, i is too far left → lo = i + 1.
At the correct cut the median is `max(left borders)` for odd total, else the average with `min(right borders)`.

## Why it works
Everything on the left of both cuts is ≤ everything on the right exactly when the two cross conditions hold, so the left side is the lower half of the merged array. The conditions are monotone in i, which makes binary search valid. Searching the shorter array keeps j inside [0, n].

## Edge cases
- Empty A: the only cut is i = 0 and the answer comes from B alone.
- Arrays with fully disjoint ranges push i to 0 or m.
- Values ±10⁶ → sums stay far below 2⁵³.

## Complexity
- Time: O(log min(m, n))
- Space: O(1)

## Testing note
Compared with a sort-and-pick oracle on 3000 random pairs (including empty arrays and heavy duplicates) and at max size.

## Reusable pattern
**Binary search on a partition** of two sorted arrays; also gives the k-th smallest of two arrays.
