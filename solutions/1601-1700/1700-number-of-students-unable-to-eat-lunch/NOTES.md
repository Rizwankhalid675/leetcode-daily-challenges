# 1700. Number of Students Unable to Eat Lunch

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, stack, queue, simulation |
| Link | https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/ |
| Context | Quest: DSA / Sequence Valley / Queue |

## What it asks (own words)
Students cycle through a queue taking the top sandwich only if it's their type. How many end up unable to eat?

## Approach
The rotation lets any student reach the front, so only **counts** of preferences matter. Walk the sandwich stack: if nobody left wants the top type, everyone remaining is stuck; otherwise one such student takes it.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with a literal queue simulation (stop when a full rotation makes no progress).

## Reusable pattern
**When a process can reorder freely, reduce it to counts** — the order stops mattering.
