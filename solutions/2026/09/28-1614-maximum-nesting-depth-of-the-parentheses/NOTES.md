# 1614. Maximum Nesting Depth of the Parentheses

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-28 |
| Solved | 2026-09-28, inside the daily window (counted as a Daily Challenge) |
| Difficulty | Easy |
| Topics | String, Stack, Bracket Sequences |
| Link | https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/ |
| Result | Accepted, 168/168 tests, 0 ms, 53.6 MB (submission 2156484979) |

## What it asks (own words)
You are given an arithmetic-looking string whose parentheses are guaranteed to be balanced. Report how many
parentheses deep the most deeply nested part of the string goes. A string with no parentheses has depth 0.

## Key constraints
- Length 1..100, so any linear or even quadratic scan is fine.
- Input is guaranteed to be a valid parentheses string, so the depth counter can never go negative and no
  validation is needed.
- Other characters (digits, `+ - * /`) are irrelevant noise.

## Reasoning
A stack is the textbook tool for parentheses, but here nothing is ever read back out of the stack; only its
*size* matters. The size of a stack of `(` at any moment is exactly "how many are open right now". So the stack
collapses to a single integer counter, and the answer is the maximum value that counter ever reaches.

## Algorithm
1. `depth = 0`, `best = 0`.
2. For each character:
   - `(` → `depth++`, then `best = max(best, depth)`.
   - `)` → `depth--`.
   - anything else → ignore.
3. Return `best`.

## Why it works
At position *i*, `depth` equals the number of `(` before *i* that have not been closed yet, which is precisely the
number of parentheses enclosing that position. Taking the maximum over all positions is the definition of the
nesting depth. Updating `best` only after an increment is enough, because depth can only reach a new maximum right
after an opening bracket.

## JavaScript implementation details
- `for (const ch of s)` iterates characters directly; no index needed.
- Comparing `ch === '('` against a string literal is clearer than `charCodeAt` and fast enough at n ≤ 100.
- `if (depth > best) best = depth` avoids a `Math.max` call per character (a micro-detail, not a requirement).

## Edge cases
- No parentheses (`"1"`) → 0.
- Sibling groups `()()()` → 1, since siblings do not add depth.
- Maximum nesting at the limit: 50 `(` followed by 50 `)` → 50.

## Bugs / debugging
None on this problem. Examples passed locally and on LeetCode before submitting; accepted on the first submission.

## Alternatives considered
- **Explicit stack**: push on `(`, pop on `)`, track the max stack size. Same O(n) time but O(n) space, and it stores
  data that is never used.
- **Prefix sum view**: map `(` → +1, `)` → −1, others → 0; the answer is the maximum prefix sum. This is the same
  algorithm written in a different vocabulary and is a useful mental model for harder bracket problems.

## Complexity
- Time: O(n), one pass.
- Space: O(1), two integers.

## Reusable pattern
**"Stack whose contents you never inspect → replace it with a counter."** Many bracket problems only need the running
balance (prefix sum of +1/−1). The same idea checks validity (the balance must never drop below 0 and must end at 0)
and finds depth (max balance).

## What to take away personally
Before reaching for a data structure, ask what information you actually read back from it. If only the size
matters, a counter is enough.
