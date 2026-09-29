# 316. Remove Duplicate Letters

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, stack, greedy, monotonic-stack |
| Link | https://leetcode.com/problems/remove-duplicate-letters/ |
| Context | Quest: DSA / Linear Shoal / Assignment II (quiz) |

## What it asks (own words)
Keep exactly one copy of each distinct letter (as a subsequence of s) so that the result is lexicographically smallest.

## Approach
Greedy **monotonic stack**: scan left to right, skip letters already in the result; before pushing c, pop any larger letter on top **if that letter appears again later** (so it can be re-added in a better position). Track membership with a Set and last occurrences with a map.

## Why it works
A larger letter before a smaller one makes the string bigger; removing it is safe exactly when a later copy exists. If no later copy exists, it must stay — so the stack is the lexicographically smallest valid choice at every step.

## Edge cases
- Letters with a single occurrence can never be popped.

## Complexity
- Time: O(n)
- Space: O(26)

## Testing note
Compared with brute force over all subsequences of length = number of distinct letters, for strings up to 10 characters over {a,b,c,d}.

## Reusable pattern
**Lexicographically smallest subsequence under constraints → monotonic stack with a 'can I drop it?' check** (same idea as 402 Remove K Digits, 1081).
