# 1401. Circle and Rectangle Overlapping

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-19 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Math, Geometry |
| Link | https://leetcode.com/problems/circle-and-rectangle-overlapping/ |
| Result | Accepted, 90/90 tests, 0 ms, 52.6 MB (submission 2156489834) |

## What it asks (own words)
Does a circle (radius, centre) share at least one point with an axis-aligned rectangle? Touching counts.

## Key constraints
- All inputs are integers, the radius is ≤ 2000, coordinates are within ±10⁴. Squared distances stay below about
  10⁹, which is exact in JS.

## Reasoning
The shapes intersect iff the rectangle point **closest to the circle's centre** lies within the radius. For an
axis-aligned rectangle the closest point is easy: clamp the centre's x into `[x1, x2]` and its y into `[y1, y2]`
independently. If the centre is inside the rectangle, the clamp returns the centre itself (distance 0).

## Algorithm
`dx = clamp(xC, x1, x2) − xC`, `dy = clamp(yC, y1, y2) − yC`; return `dx² + dy² ≤ r²`.

## Why it works
The squared distance from the centre to a rectangle point is `(x − xC)² + (y − yC)²`, and the two terms can be
minimized separately over the independent ranges `[x1, x2]` and `[y1, y2]`. Each is minimized at the clamp.
Comparing *squared* distances avoids `Math.sqrt` and keeps everything in exact integer arithmetic.

## JavaScript implementation details
- `clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))` is a reusable idiom.
- Avoid `Math.hypot`/`Math.sqrt` for boundary comparisons: float rounding can flip an exact tangency.

## Edge cases
- Tangent (touching at exactly one point) → true (`≤`).
- Near a corner: the corner is the closest point (distance √2 vs radius 1 or 2).
- Circle entirely inside the rectangle, or rectangle entirely inside the circle → true.

## Bugs / debugging
None. It was verified against a point-sampling oracle (quarter-unit grid over the rectangle; exact for integer
inputs because the closest point is a lattice point) on 1000 random cases.

## Alternatives considered
- Case analysis (centre inside; circle crosses an edge; circle contains a corner). It's error-prone, and the clamp
  handles every case uniformly.

## Complexity
- Time: O(1).
- Space: O(1).

## Reusable pattern
**Closest point on an axis-aligned box = per-axis clamp.** It extends to 3-D boxes and to "distance from a point to a
segment", where you clamp the projection parameter.

## What to take away personally
Compare squared distances whenever possible, since exact integer maths beats floating-point square roots. And
compare with 836 (rectangle–rectangle): both reduce 2-D geometry to independent per-axis checks.
