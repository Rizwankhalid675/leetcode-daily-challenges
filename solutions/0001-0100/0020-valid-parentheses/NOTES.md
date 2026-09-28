# 20. Valid Parentheses

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string, stack |
| Link | https://leetcode.com/problems/valid-parentheses/ |
| Study plan | Top Interview 150 (Stack) |

## What it asks (own words)
Is a string of the three bracket types properly nested and matched?

## Key constraints
- Length ≤ 10⁴.

## Approach
A stack of **expected closers**: for each opener, push its matching closer. For each closer, pop and compare. At the end
the stack must be empty.

## Why it works
Proper nesting means each closer must close the most recently opened, still-open bracket, which is the top of the
stack. Pushing the expected closer makes that a single comparison.

## Edge cases
- A leftover opener → false (non-empty stack).
- A closer on an empty stack: `pop()` returns undefined, which is `!== ch` → false.
- Crossed brackets "([)]".

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
The reference repeatedly deletes innermost "()", "[]" and "{}" pairs with a regex until nothing changes. It's a
completely different algorithm.

## Reusable pattern
**Push what you expect to see next.** It simplifies matching logic. (Compare 1614, where only the depth mattered and
a counter replaced the stack.)
