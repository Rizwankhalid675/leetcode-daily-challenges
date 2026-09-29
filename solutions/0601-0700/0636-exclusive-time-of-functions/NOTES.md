# 636. Exclusive Time of Functions

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, stack |
| Link | https://leetcode.com/problems/exclusive-time-of-functions/ |
| Context | Quest: DSA / Linear Shoal / Stack |

## What it asks (own words)
Given start/end logs of nested function calls on one CPU, compute each function's exclusive running time (time spent on top of the call stack).

## Key subtlety
`start` happens at the **beginning** of its time unit, `end` at the **end** of its unit — so an end at time t includes unit t.

## Approach
Keep a call stack of ids and `prev`, the first time unit not yet credited:
- start at t: credit `t − prev` to the current top (if any), push, `prev = t`;
- end at t: credit `t − prev + 1` to the popped function, `prev = t + 1`.

## Why it works
Between consecutive events exactly one function (the top) runs; the cursor ensures every time unit is credited once.

## Complexity
- Time: O(number of logs)
- Space: O(depth)

## Testing note
Reference expands the timeline unit by unit and assigns each unit to the stack top; compared on 500 random well-nested logs (including recursion of the same id).

## Reusable pattern
**Stack + time cursor** for nested intervals (inclusive-end off-by-one is the whole difficulty).
