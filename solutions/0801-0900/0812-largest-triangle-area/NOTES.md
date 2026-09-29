# 812. Largest Triangle Area

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math, geometry, polygons |
| Link | https://leetcode.com/problems/largest-triangle-area/ |
| Context | Quest: Maths / Geometric Configuration Mecha Workshop / Geometry |

## What it asks (own words)
Pick three of the given points to form the triangle with the greatest area.

## Approach
With at most 50 points there are under 20,000 triples, so check them all. The area of a triangle is half the absolute cross product of two edge vectors (the shoelace formula), which uses only integer arithmetic until the final halving.

## Complexity
- Time: O(n³)
- Space: O(1)

## Testing note
Compared (within 1e-6) with Heron's formula on random point sets.

## Reusable pattern
**Cross product for area and orientation**: |(B − A) × (C − A)| / 2, exact on integer coordinates.
