# 1190. Reverse Substrings Between Each Pair of Parentheses

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-27 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | String, Stack, Bracket Sequences |
| Link | https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/ |
| Result | Accepted, 40/40 tests, 1 ms, 52.8 MB (submission 2156491011) |

## What it asks (own words)
Reverse the text inside every pair of parentheses, innermost first, and then drop the parentheses.

## Key constraints
- |s| ≤ 2000, so even O(n²) passes. But there is a neat O(n) method worth learning.

## Reasoning
**Straightforward (O(n²)):** keep a stack of partial strings. `(` pushes a new empty string, `)` pops, reverses and
appends to the parent. Correct, but each reversal copies up to n characters. This is the test oracle.

**Wormhole walk (O(n)):** think about how the final string is *read*. Reversing a bracketed part means reading it
right-to-left. Nested reversals flip direction again. So:
1. Pre-compute each bracket's partner with a stack.
2. Walk the string with a direction `dir = ±1`. Output letters as you pass them. On hitting a bracket, **teleport to
   its partner and flip direction**, then keep walking.

Entering a pair from either side lands you on its other end, heading back inward in the opposite direction, which
is exactly reading the inside reversed. Leaving through the other bracket teleports you back out and flips again.

## Algorithm
1. `partner[]` via a stack of `(` indices.
2. `for (i = 0, dir = 1; i < n; i += dir)`: if `s[i]` is a bracket → `i = partner[i]`, `dir = −dir`; else output
   `s[i]`.
3. Join the output.

## Why it works
Each bracket is visited exactly twice (once in each direction), and each letter exactly once. The number of
direction flips before reaching a letter equals the number of pairs enclosing it, modulo 2, which matches how many
times the stack approach would reverse it.

## JavaScript implementation details
- `Int32Array` for `partner` (compact, zero-initialised).
- Two loop variables in one `for` header: `for (let i = 0, dir = 1; i < n; i += dir)`. The increment uses the
  *current* direction, so after a teleport `i += dir` moves inward from the partner.
- Tests generate random balanced strings to compare against the stack-reversal reference.

## Edge cases
- No parentheses → unchanged.
- Empty pair `()` → removed.
- Double nesting `((ab))` → the reversals cancel → `ab`.
- Siblings `(ab)(cd)` → each reversed independently → `badc`.

## Bugs / debugging
None. It was verified against the O(n²) stack-of-strings reference on 1000 random balanced strings.

## Alternatives considered
- Stack of strings (the O(n²) reference).
- A character stack that pops until `(`, reverses and pushes back. Also O(n²).

## Complexity
- Time: O(n).
- Space: O(n).

## Reusable pattern
**Bracket matching via a stack, then "jump to the partner".** Pre-computing partners turns nested structure into
O(1) jumps. A direction flag replaces physical reversal.

## What to take away personally
If an operation is "reverse", ask whether you can instead *read* in the other direction. Here that removes all
copying. This finishes a three-day bracket run (1807, 1190, 1614), all built on the same "match brackets / track
depth" ideas.
