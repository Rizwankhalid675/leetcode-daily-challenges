# 150. Evaluate Reverse Polish Notation

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, stack |
| Link | https://leetcode.com/problems/evaluate-reverse-polish-notation/ |
| Study plan | Top Interview 150 (Stack) |

## What it asks (own words)
Evaluate an arithmetic expression written in postfix (operators after their operands), with integer division that
truncates toward zero.

## Key constraints
- Up to 10⁴ tokens. All intermediate values fit in 32 bits.

## Approach
An operand stack: push numbers; for an operator, pop **b then a** (the right operand is on top), and push `a op b`.

## Why it works
In postfix order an operator's operands are always the two most recent completed values, which are the top two stack
entries.

## JavaScript implementation details
- **Truncating division:** JS `/` is floating-point. `Math.floor` rounds toward −∞, which is wrong for negatives (−7/2
  would give −4). `Math.trunc` is right but returns **−0** for −1/5. `(a / b) | 0` truncates toward zero and gives 0.
  It's safe because every value fits in 32 bits. The test uses `Object.is` to catch −0.
- Operand order: `a − b` and `a / b`, not the reverse.

## Bugs / debugging
The random expression test caught a second source of −0 that I hadn't guarded against: **multiplication**
(`−12 * 0 === −0`). The expression `1 5 -7 -5 + 0 * * *` evaluated to −0. LeetCode would print it as 0, but strict
equality in the test flagged it. The fix is `+ 0` on the final result, which turns −0 into 0. Signed zero shows up
across these notes (238, 150): any sign-producing operation can create it.

## Edge cases
- Negative number tokens like "-11" are operands, not operators. The check is for exact operator tokens, not the
  first character.
- Division of a negative by a positive.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Random expression trees are generated and evaluated directly, and their postfix form is fed to the solution: 2000
cases.

## Reusable pattern
**Postfix evaluation with a stack.** It's the back end of the shunting-yard algorithm (infix → postfix), as in the
basic calculator (224).
