# 74. Search a 2D Matrix

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, matrix |
| Link | https://leetcode.com/problems/search-a-2d-matrix/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Each row is sorted and each row starts above the previous row's last value. Report whether the target is in the matrix, in O(log(m·n)).

## Approach
Reading the rows one after another gives a single sorted sequence of length m·n. Binary search over indices `0..m·n−1`, mapping index k to `matrix[floor(k / n)][k % n]`.

## Edge cases
- 1×1 matrix.
- Target outside the value range.

## Complexity
- Time: O(log(m·n))
- Space: O(1)

## Testing note
Random matrices are built by chunking a sorted list of distinct values into rows; the answer is compared with `includes` on the flat list.

## Reusable pattern
**Virtual flattening**: binary search on an index space and map each index back to 2-D coordinates.
