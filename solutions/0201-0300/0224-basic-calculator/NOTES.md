# 224. Basic Calculator

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | math, string, stack, recursion |
| Link | https://leetcode.com/problems/basic-calculator/ |
| Study plan | Top Interview 150 (Stack) |

## What it asks (own words)
Evaluate an expression containing non-negative integers, `+`, `-` (which can also be unary), parentheses and spaces,
without `eval`.

## Key constraints
- Up to 3·10⁵ characters, so a single linear pass is needed.

## Approach
With only + and −, every number ends up contributing ±number to the total. Track:
- `result`: the running total at the current parenthesis level;
- `sign`: the sign for the number currently being read;
- a stack of saved `(result, sign)` pairs for enclosing levels.

On `(`, push the current result and sign, then reset. On `)`, finish the inner number, pop the outer sign and result,
and fold: `result = outerResult + outerSign · innerResult`.

## Why it works
A parenthesized group behaves like a single number whose sign is the sign in effect just before `(`. The stack
restores the outer context in LIFO order, matching the nesting.

## Edge cases
- Unary minus at the start or right after "(", e.g. "-(2+3)" and "1-(     -2)". Because `result` starts at 0, a leading
  "-" works as "0 − …".
- Spaces anywhere, including inside numbers' surroundings.
- Multi-digit numbers.

## Complexity
- Time: O(n)
- Space: O(nesting depth)

## Testing note
Random nested expressions (with unary minus) are compared against an independently written recursive-descent evaluator
on 2000 cases.

## Reusable pattern
**Sign-stack evaluation for +/− with parentheses.** With `*` and `/` added (227, 772), you also need operator
precedence.
