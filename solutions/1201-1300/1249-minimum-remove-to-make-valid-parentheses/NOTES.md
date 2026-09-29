# 1249. Minimum Remove to Make Valid Parentheses

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, stack |
| Link | https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Ascension I |

## What it asks (own words)
Delete as few parentheses as possible (letters stay) so the brackets are balanced; return any such result.

## Key constraints
- Length up to 10⁵: build the output with an array join, not repeated string splicing.

## Approach
Scan left to right, pushing indices of "(" on a stack.
- ")" with an empty stack has no partner anywhere to its left → mark it for removal.
- ")" otherwise pops (matches) the nearest open.
After the scan, every index still on the stack is an unmatched "(" → mark it. Output the unmarked characters.

## Why it works
The removal count equals (unmatched ")") + (unmatched "(") from the greedy scan, which is a lower bound: each of those characters cannot be paired in any valid subsequence. The greedy result achieves it and is balanced.

## Edge cases
- Only closers "))((" → empty string.
- No parentheses at all → unchanged.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Checked validity, minimality (against both the balance formula and an exhaustive subset search on tiny strings) and that letters are all kept in order.

## Reusable pattern
**Stack of indices for bracket matching**: unmatched closers are found during the scan, unmatched openers are what remains on the stack.
