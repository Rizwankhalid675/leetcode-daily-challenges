# 2390. Removing Stars From a String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, stack, simulation |
| Link | https://leetcode.com/problems/removing-stars-from-a-string/ |
| Study plan | LeetCode 75 (Stack) |

## What it asks (own words)
Each `*` deletes itself and the nearest remaining letter to its left. What's left at the end? (A valid deletion is
always possible.)

## Key constraints
- Length up to 10⁵, so repeatedly slicing strings (O(n²)) is too slow.

## Approach
A stack of surviving letters: push letters, pop on `*`, then join.

## Why it works
The "nearest remaining letter to the left" of a star is exactly the most recently kept letter, which is the top of
the stack. The order in which stars are processed doesn't matter; the statement notes the result is unique.

## Edge cases
- Everything erased → empty string.
- Consecutive stars pop consecutive letters.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
**"Delete the most recent X" → stack.** This is the same structure as backspace handling (844) and the undo operation.
The test compares against a literal, slow simulation of the rule.
