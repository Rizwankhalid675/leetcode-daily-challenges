# 22. Generate Parentheses

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming, backtracking, bracket-sequences |
| Link | https://leetcode.com/problems/generate-parentheses/ |
| Context | Quest: 2026 Spring Sprint / Week 1: Practice / Practice II |

## What it asks (own words)
List every well-formed string made of n pairs of parentheses.

## Key constraints
- 1 <= n <= 8, so the output has at most 1430 strings (the 8th Catalan number).

## Approach
Build the string one character at a time and keep two counters:
- `(` is allowed while fewer than n have been opened.
- `)` is allowed while it closes an open one (`close < open`).

When the length reaches 2n, the string is complete and valid. A shared buffer with push/pop avoids copying partial strings.

## Why it works
Those two rules are exactly the prefix conditions of a balanced string, so every branch leads to a valid answer and no pruning is wasted.

## Complexity
- Time: O(C_n * n), where C_n is the n-th Catalan number.
- Space: O(n) recursion depth (at most 16), plus the output.

## Testing note
Compared with a filter over all 2^(2n) strings for n = 1..8, and checked the counts against the Catalan numbers.

## Reusable pattern
**Backtracking with validity counters**: only branch into choices that keep the prefix valid.
