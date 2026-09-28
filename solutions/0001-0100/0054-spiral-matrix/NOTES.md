# 54. Spiral Matrix

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, matrix, simulation |
| Link | https://leetcode.com/problems/spiral-matrix/ |
| Study plan | Top Interview 150 (Matrix) |

## What it asks (own words)
List the matrix elements in clockwise spiral order, starting at the top-left.

## Key constraints
- Up to 10×10.

## Approach
Four boundaries (top, bottom, left, right). Each lap goes along the top row, down the right column, back along the
bottom row, and up the left column. Then shrink all four. Skip the bottom leg when only one row remains, and the left
leg when only one column remains, so those cells aren't visited twice.

## Why it works
Each lap consumes exactly the outer ring of the remaining sub-rectangle, and the guards handle degenerate rings (a
single row or column).

## Edge cases
- A single row, a single column, 1×1, and non-square shapes: every shape from 1×1 to 10×10 is tested.

## Complexity
- Time: O(m·n)
- Space: O(1) besides the output

## Testing note
The reference is a completely different simulation: a walker that turns right whenever blocked. It was compared on all
100 shapes.

## Reusable pattern
**Layer-by-layer traversal with shrinking bounds.** Guard the degenerate single-row and single-column layers.
