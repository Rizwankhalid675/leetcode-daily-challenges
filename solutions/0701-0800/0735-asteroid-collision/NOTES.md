# 735. Asteroid Collision

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, stack, simulation |
| Link | https://leetcode.com/problems/asteroid-collision/ |
| Study plan | LeetCode 75 (Stack) |

## What it asks (own words)
Asteroids move right (positive) or left (negative) at equal speed. When two meet, the smaller one explodes, or both
do if they're equal in size. Which asteroids survive, in order?

## Key constraints
- n ≤ 10⁴, and sizes are never 0.

## Approach
A stack of survivors, processed left to right. A collision can only happen when the incoming asteroid moves left and
the stack's top moves right. While that holds:
- top smaller → pop it, and the newcomer continues;
- equal → pop it, and the newcomer also dies;
- top bigger → the newcomer dies.

If the newcomer survives, push it.

## Why it works
The stack always holds a stable configuration: some left-movers followed by some right-movers, none of which will
ever meet. A new left-mover can only reach the right-movers at the end of the stack, nearest first, so resolving
collisions from the top is the true order of events.

## Edge cases
- Left-movers at the start and right-movers at the end never meet ("moving apart").
- Equal sizes destroy both.
- One large left-mover can destroy several right-movers in a row.

## Complexity
- Time: O(n): each asteroid is pushed and popped at most once
- Space: O(n)

## Reusable pattern
**Stack-based simulation where each new element "attacks" the top until blocked.** It's the same structure as
monotonic-stack problems (739 Daily Temperatures). The test checks against a naive "resolve any adjacent colliding
pair" simulation.
