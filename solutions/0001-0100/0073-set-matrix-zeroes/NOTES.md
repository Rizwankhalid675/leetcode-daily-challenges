# 73. Set Matrix Zeroes

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, matrix |
| Link | https://leetcode.com/problems/set-matrix-zeroes/ |
| Study plan | Top Interview 150 (Matrix) |

## What it asks (own words)
Wherever the original matrix has a 0, zero out that entire row and column, in place. The follow-up asks for constant
extra space.

## Key constraints
- Up to 200×200. Values span the full 32-bit range, so no value can serve as a "marker" sentinel.

## Approach (O(1) space)
Use the **first row and first column as flag storage**:
1. Record whether the first row and the first column originally contain a zero (two booleans).
2. For every inner cell that is 0, set its row's first cell and its column's first cell to 0.
3. Zero every inner cell whose row or column flag is set.
4. Finally, zero the first row and/or first column if step 1 said so.

## Why it works
The flags are written only into first-row and first-column cells, and those cells are consumed only for inner cells,
before they're themselves overwritten in step 4. The two booleans preserve the information the markers would otherwise
destroy.

## Edge cases
- A zero in the first row or column, which is exactly why the separate booleans exist.
- 1×1 and single-row or single-column matrices.

## Complexity
- Time: O(m·n)
- Space: O(1)

## Alternatives
Row and column Sets (O(m + n) space). This is the simple version, and the test reference.

## Reusable pattern
**Reuse part of the input as scratch storage,** saving whatever information that scratch area originally held.
