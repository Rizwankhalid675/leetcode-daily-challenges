# 2695. Array Wrapper

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/array-wrapper/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Make a class whose instances turn into the sum of their numbers when added with `+`, and into a bracketed, comma-separated list when converted with `String()`.

## Approach
JS converts objects to primitives with hooks. `+` uses the "default" hint, which tries `valueOf` first, so `valueOf` returns the sum. `String(obj)` uses the "string" hint, which tries `toString` first, so `toString` returns `JSON.stringify(nums)`, i.e. `[1,2]` with no spaces.

## Edge cases
- Empty array: the sum is 0 and the string is `"[]"`.

## Complexity
- Time: O(n) per conversion
- Space: O(n) for the string

## Testing note
The official examples, empty wrappers, and random arrays checked for both the sum and the string form.

## Reusable pattern
**Type coercion hooks** (`valueOf`, `toString`, and the more general `Symbol.toPrimitive`).
