# 2667. Create Hello World Function

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/create-hello-world-function/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Write a factory whose returned function always answers "Hello World", no matter what it is called with.

## Approach
Return an inner function (a closure) that returns the constant string. The rest parameter just documents that arguments are accepted and ignored.

## Edge cases
- Arbitrary arguments, including objects and `null`: ignored.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
The official examples, plus a check that two factory calls give distinct functions with the same behavior.

## Reusable pattern
**Functions returning functions**: the starting point for closures, currying and decorators.
