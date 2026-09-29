# 761. Special Binary String

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | string, divide-and-conquer, sorting |
| Link | https://leetcode.com/problems/special-binary-string/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Interview Benchmark IV |

## What it asks (own words)
A "special" string is a balanced 1/0 string where 1 plays "(" and 0 plays ")". You may swap any two adjacent special substrings as often as you like; return the lexicographically largest result.

## Key constraints
- Length ≤ 50, so recursion depth and string copying are trivial.

## Approach
1. Cut s into its top-level blocks (every point where the balance returns to 0). Each block is `1 + inner + 0` where inner is itself special.
2. Recursively make each inner part as large as possible.
3. The swaps let us permute the top-level blocks freely (adjacent swaps generate every permutation), so order them to maximise the concatenation: sort by `a + b > b + a` descending, then join.

## Why it works
A swap never crosses a block boundary in a way that changes the block structure: any special substring is a run of consecutive blocks at some nesting level, so a move is always "reorder siblings at one level". Therefore each level is optimised independently, inner levels first; the outer 1…0 wrapper is fixed.

## Edge cases
- One block ("10", "1100"): nothing to reorder at the top, recurse inside.
- Empty inner string returns "".

## Complexity
- Time: O(n²) in the worst case (string slicing across ≤ n/2 levels; n ≤ 50)
- Space: O(n) recursion

## Testing note
Compared with a BFS that applies every legal swap until closure, on random special strings up to length 12.

## Reusable pattern
**Balanced strings as trees**: split into top-level blocks, solve children recursively, then sort siblings with the `a+b vs b+a` concatenation comparator (as in 179 Largest Number).
