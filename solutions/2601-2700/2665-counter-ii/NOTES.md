# 2665. Counter II

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/counter-ii/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Return an object with three methods over a shared number: add one, subtract one, and go back to the starting value. Each method returns the new value.

## Approach
Keep `init` (never changed) and `cur` (the working value) in the closure. Prefix `++`/`--` return the updated value. The assignment expression `(cur = init)` also evaluates to the new value.

## Edge cases
- `reset` right after creation returns `init`.
- Negative values are fine.

## Complexity
- Time: O(1) per call
- Space: O(1)

## Testing note
The official examples, plus random call sequences compared against a plain-variable model.

## Reusable pattern
**Several closures sharing one private variable**, which is the module pattern.
