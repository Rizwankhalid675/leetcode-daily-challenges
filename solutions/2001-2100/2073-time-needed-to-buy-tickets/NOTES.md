# 2073. Time Needed to Buy Tickets

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, queue, simulation |
| Link | https://leetcode.com/problems/time-needed-to-buy-tickets/ |
| Context | Quest: DSA / Sequence Valley / Queue |

## What it asks (own words)
People repeatedly buy one ticket each and rejoin the back of the line; how long until person k finishes?

## Approach
Person k needs t[k] rounds. In those rounds everyone ahead of (or at) k buys up to t[k] tickets; everyone behind k only gets t[k] − 1 turns before k's last purchase. Sum `min(t[i], cap)`.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with a literal round-robin simulation.

## Reusable pattern
**Replace a simulation with per-element contribution counting** (compare 3871).
