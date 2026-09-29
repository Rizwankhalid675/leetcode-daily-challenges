# 2140. Solving Questions With Brainpower

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/solving-questions-with-brainpower/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Go through questions in order; solving question i earns its points but forces you to skip the next brainpower[i] questions. Skipping is free. Maximize the points.

## Key constraints
- n up to 10⁵ and points up to 10⁵, so the total can reach 10¹⁰ (beyond 32 bits, fine for doubles).

## Approach
Work from the back. `best[i]` is the most you can earn from questions i..n−1: either skip i (`best[i+1]`) or solve it and jump to `i + brainpower + 1` (0 if that runs past the end).

## Edge cases
- Jumps past the end are clamped to 0.
- Single question: its points.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with checking every subset of solved questions for validity (up to 12 questions); plus a 10⁵ case whose answer (5·10⁹) exceeds 32 bits.

## Reusable pattern
**Suffix DP when a choice forces a forward jump**: the future depends only on where you land.
