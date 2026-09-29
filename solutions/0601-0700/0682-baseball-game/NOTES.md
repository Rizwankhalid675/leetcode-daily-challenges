# 682. Baseball Game

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, stack, simulation |
| Link | https://leetcode.com/problems/baseball-game/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Process a list of scoring commands (a number, "+", "D" for double, "C" for cancel) and return the total of the surviving scores.

## Approach
A stack holds the valid scores; each command looks at or modifies its top. Sum the stack at the end.

## Edge cases
- Negative numbers (`Number` parses `"-2"`).
- Everything cancelled → 0.
- The guarantees ensure "+", "D", "C" always have enough scores.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Official examples plus hand-computed cases with negatives and full cancellation. Values stay far below 2⁵³ (≤ 1000 ops with doubling bounded by the problem's 32-bit guarantee).

## Reusable pattern
**Stack for "undo / refer to the last few" command streams.**
