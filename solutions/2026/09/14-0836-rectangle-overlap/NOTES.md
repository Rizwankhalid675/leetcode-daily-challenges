# 836. Rectangle Overlap

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-14 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | Math, Geometry |
| Link | https://leetcode.com/problems/rectangle-overlap/ |
| Result | Accepted, 41/41 tests, 0 ms, 53.5 MB (submission 2156489228) |

## What it asks (own words)
Two axis-aligned rectangles are given by their bottom-left and top-right corners. Do they share a region of
positive area? Touching along an edge or at a corner does not count.

## Key constraints
- Coordinates up to ±10⁹. We only compare values, and never multiply them, so there's no precision risk.

## Reasoning
An axis-aligned rectangle is the product of an x-interval and a y-interval. The intersection of two such
rectangles is the product of the two interval intersections. It has positive area iff **both** interval
intersections have positive length. Two intervals [a1, a2] and [b1, b2] intersect in [max(a1,b1), min(a2,b2)],
which has positive length iff `max(a1, b1) < min(a2, b2)`. The strict `<` is what excludes edge touching.

## Algorithm
Return `max(ax1,bx1) < min(ax2,bx2) && max(ay1,by1) < min(ay2,by2)`.

## Why it works
It is a direct decomposition of 2-D overlap into two 1-D overlaps.

## JavaScript implementation details
- Array destructuring `const [x1, y1, x2, y2] = rec` names the four coordinates.

## Edge cases
- Corner touch or edge touch → false (the strict inequality).
- One rectangle inside the other → true.
- Cross shape (neither contains a corner of the other) → true. This case breaks the common wrong idea of "check
  whether any corner is inside the other rectangle".

## Bugs / debugging
None. It was compared against a unit-square rasterization oracle on 2000 random integer rectangles.

## Alternatives considered
- The negation: "they don't overlap iff one is entirely left, right, above or below the other". It's equivalent;
  the max/min form generalizes more directly to computing the intersection area.
- Corner-in-rectangle checks. **Wrong** for the cross shape.

## Complexity
- Time: O(1).
- Space: O(1).

## Reusable pattern
**Interval intersection: `max(starts) < min(ends)`** (or `≤` for closed intervals that may touch). Axis-aligned
problems in higher dimensions decompose into independent 1-D problems.

## What to take away personally
Learn the one-line interval overlap test by heart. It shows up in scheduling, geometry and range problems. Choose
`<` versus `≤` deliberately based on whether touching counts.
