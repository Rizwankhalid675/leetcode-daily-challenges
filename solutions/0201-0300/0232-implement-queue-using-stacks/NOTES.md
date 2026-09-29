# 232. Implement Queue using Stacks

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | stack, design, queue |
| Link | https://leetcode.com/problems/implement-queue-using-stacks/ |
| Context | Quest: DSA / Sequence Valley / Queue |

## What it asks (own words)
Implement a FIFO queue using only stack operations.

## Approach
Two stacks: new elements go on `inbox`; `outbox` holds elements in reversed (queue) order. When `outbox` is empty and we need the front, pour all of `inbox` into it.

## Why it works / complexity
Each element is moved from inbox to outbox at most once, so every operation is **amortized O(1)** (a single pop can be O(n), but it pays for n cheap ones).

## Complexity
- Time: amortized O(1) per operation
- Space: O(n)

## Reusable pattern
**Two-stack queue / amortized analysis** — the idea behind many 'reverse lazily' structures.
