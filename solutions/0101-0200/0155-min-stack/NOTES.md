# 155. Min Stack

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | stack, design |
| Link | https://leetcode.com/problems/min-stack/ |
| Study plan | Top Interview 150 (Stack) |

## What it asks (own words)
Build a stack with push, pop, top, and getMin, all in O(1) time.

## Key constraints
- Up to 3·10⁴ calls; values span the 32-bit range.

## Approach
Alongside each pushed value, store **the minimum of the stack up to that point** (in a parallel array). getMin reads
the top of the minimum array. Pop removes from both.

## Why it works
A stack only changes at the top. The minimum of the elements below any entry never changes while that entry is
present, so the stored minimum stays correct until that entry is popped.

## Edge cases
- Duplicate minimum values: popping one copy must not lose the minimum. Per-entry minimums handle this naturally,
  whereas a "separate min stack that only pushes on strictly smaller values" version breaks here.

## Complexity
- Time: O(1) per operation
- Space: O(n)

## Testing note
Compared against a plain array (recomputing `Math.min` each time) over 20,000 random operations with many repeated
values.

## Reusable pattern
**Augment each stack entry with an aggregate of everything below it** (min, max, sum). It's the same idea as prefix
aggregates, applied to a stack.
