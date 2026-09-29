# 1441. Build an Array With Stack Operations

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, stack, simulation |
| Link | https://leetcode.com/problems/build-an-array-with-stack-operations/ |
| Context | Quest: DSA / Linear Shoal / Stack |

## What it asks (own words)
Numbers 1..n arrive in order; with Push/Pop build a stack equal to `target` (strictly increasing), stopping as soon as it matches.

## Approach
For each incoming number up to the last target value: always Push; if it isn't the next needed target value, Pop it right away.

## Why it works
The target is increasing, so every skipped number sits between two target values and must be discarded before the next target value is pushed — immediately popping it is the only option.

## Edge cases
- Stop after the last target value (don't read the rest of the stream).

## Complexity
- Time: O(last target)
- Space: O(output)

## Testing note
Tests replay the produced operations and check the final stack equals target.

## Reusable pattern
Simulate the process directly when the rules force each decision.
