# 307. Range Sum Query - Mutable

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, divide-and-conquer, design, binary-indexed-tree, segment-tree, sqrt-decomposition |
| Link | https://leetcode.com/problems/range-sum-query-mutable/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Segment Tree |

## What it asks (own words)
Support two operations on an array: overwrite one element, and report the sum of a contiguous range.

## Approach
A Fenwick tree stores partial sums where `tree[i]` covers the `i & -i` elements ending at position i (1-based).
- Build in O(n) by pushing each cell into its parent.
- `update` converts "set to val" into "add delta" using a copy of the current values, then walks up with `i += i & -i`.
- `sumRange(l, r) = prefix(r + 1) - prefix(l)`, where `prefix` walks down with `i -= i & -i`.

A segment tree works equally well; the Fenwick version is shorter.

## Edge cases
- The input array is copied, so outside changes cannot corrupt the stored values.
- Negative values are fine: sums stay tiny integers.

## Complexity
- Time: O(n) build, O(log n) per update and per query
- Space: O(n)

## Testing note
Random update/query sequences compared against a plain array with loop sums; one timing test at the maximum sizes.

## Reusable pattern
**Point update + range sum = Fenwick tree** (convert assignments into deltas).
