# 657. Robot Return to Origin

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string, simulation |
| Link | https://leetcode.com/problems/robot-return-to-origin/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Given a string of U/D/L/R steps, does the robot end where it started?

## Approach
Keep the net x and y offsets; both must be 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with the equivalent count condition (#U = #D and #L = #R).

## Reusable pattern
**Net displacement instead of tracking the path.**
