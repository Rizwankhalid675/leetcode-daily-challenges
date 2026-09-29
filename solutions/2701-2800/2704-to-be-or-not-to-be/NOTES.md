# 2704. To Be Or Not To Be

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/to-be-or-not-to-be/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Write a tiny assertion helper: `expect(x).toBe(y)` passes when they are strictly equal and `notToBe` passes when they are not. A failure throws an error with a specific message.

## Approach
Return an object literal with two methods that close over `val`. Each one compares with `===` and either returns `true` or throws `new Error(...)`. The judge reads the error's `message`.

## Edge cases
- `1` vs `'1'` and `0` vs `false` are different under `===`.
- Two distinct objects are never `===`.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
The official examples, plus strict-equality corner cases asserted through the thrown message.

## Reusable pattern
**Returning an object of closures** to build a small fluent API (the idea behind test frameworks' `expect`).
