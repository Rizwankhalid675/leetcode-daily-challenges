# 1041. Robot Bounded In Circle

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, string, simulation |
| Link | https://leetcode.com/problems/robot-bounded-in-circle/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
A robot repeats a G/L/R instruction string forever. Does it stay within some bounded circle?

## Approach
Run the instructions once. If it's back at the origin, it's obviously bounded. If it ends facing any direction other than north, the displacement vector gets rotated each round and cancels out after 2 or 4 rounds, so it returns home too. Only "moved away and still facing north" drifts forever.

## Edge cases
- No `G` at all → stays at the origin.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Oracle: simulate four repetitions and check that the robot is at the origin (four quarter turns always cancel a rotated displacement).

## Reusable pattern
**Argue about one period of a repeated process** instead of simulating forever.
