# 858. Mirror Reflection

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, geometry, number-theory, least-common-multiple, greatest-common-divisor |
| Link | https://leetcode.com/problems/mirror-reflection/ |
| Context | Quest: Maths / Number Theory Factor Encryption Station / Assignment (quiz) |

## What it asks (own words)
A laser starts in the south-west corner of a square mirrored room of side p and first meets the east wall at height q. Which of the three corner receptors (0 south-east, 1 north-east, 2 north-west) does it hit first?

## Approach
Unfold the reflections: the ray becomes a straight line of slope q/p through a grid of mirrored rooms, and it reaches a corner at the first height L that is a multiple of both p and q, i.e. L = lcm(p, q). By then it has crossed L/q room widths and L/p room heights.
- An even number of heights means the corner is at the bottom: receptor 0.
- Otherwise an odd number of widths means the east side (1), even means the west side (2).

Dividing p and q by 2 until one is odd gives the same parities directly: L/q is even exactly when p (after the reduction) is even, and L/p is even exactly when q is even.

## Why it works
Reflecting the room instead of the ray preserves which corner a straight line lands on, with parity telling whether each coordinate got mirrored. Both counts cannot be even since they are coprime.

## Complexity
- Time: O(log p)
- Space: O(1)

## Testing note
Checked against both the explicit lcm-parity formula and a step-by-step bounce simulation for every p, q ≤ 150.

## Reusable pattern
**Unfold reflections into a straight line** (billiards, mirrors), then reason with lcm and parity.
