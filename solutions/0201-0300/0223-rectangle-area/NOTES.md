# 223. Rectangle Area

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, geometry |
| Link | https://leetcode.com/problems/rectangle-area/ |
| Context | Quest: Maths / Geometric Configuration Mecha Workshop / Geometry |

## What it asks (own words)
Two axis-aligned rectangles; how much area do they cover together?

## Approach
Add both areas and subtract the part counted twice. The overlap spans from the larger left edge to the smaller right edge (and likewise vertically); if that span is negative there is no overlap, so clamp it at 0.

## Edge cases
- Rectangles that only touch, or zero-width rectangles, have 0 overlap.
- The largest total is 8·10⁸, fine for doubles (the classic 32-bit overflow issue in other languages does not arise).

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
Compared with counting covered unit cells on a small grid.

## Reusable pattern
**Interval intersection = [max(starts), min(ends)], clamped at 0**, applied per axis.
