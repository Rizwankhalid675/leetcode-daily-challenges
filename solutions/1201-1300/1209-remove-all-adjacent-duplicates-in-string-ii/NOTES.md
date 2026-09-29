# 1209. Remove All Adjacent Duplicates in String II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, stack |
| Link | https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Challenge III |

## What it asks (own words)
Keep deleting any block of k identical adjacent letters (the pieces on each side then join) until no such block remains. Return what is left.

## Key constraints
- Up to 10^5 characters, 2 <= k <= 10^4. Rescanning after every deletion would be quadratic.

## Approach
Keep a stack of runs, each a letter with its length. For each character, extend the top run if it is the same letter, otherwise push a new run of length 1. When a run reaches k, pop it. The runs on either side are now adjacent on the stack, and the next matching character continues the lower run. Finally, expand the runs into the answer.

## Why it works
The final result does not depend on the order of deletions, so processing left to right and deleting as soon as a run reaches k gives the same answer as any other order.

## Edge cases
- Cascades such as `abba` with k = 2 empty the string.
- Runs longer than k leave the remainder (`aaa`, k = 2 leaves `a`).

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with a literal "find and delete the first k-run, repeat" simulation on 2000 random strings over a 3-letter alphabet with k from 2 to 4, plus 10^5-length timing runs.

## Reusable pattern
**Run-length stack** for cascading adjacent removals (compare 1047 with k = 2).
